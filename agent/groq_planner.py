
import os

from dotenv import load_dotenv
from groq import Groq

from agent.schemas import ActionPlan

load_dotenv()

SYSTEM_INSTRUCTIONS = """
You are the action-planning component of AccessAble,
an accessible smart-home assistant.

Supported devices and commands:
- living_room_light: set_power, power on/off
- bedroom_fan: set_power, power on/off
- living_room_curtains: set_position, position open/closed
- front_door_lock: set_lock, state locked/unlocked

Rules:
1. Return one JSON object with fields "request" and "actions".
2. Each action must contain:
   action_id, device, command, parameters, requires_confirmation.
3. Use unique action IDs: action_1, action_2, etc.
4. Include only actions clearly requested by the user.
5. Preserve the user's original request in "request".
6. Set requires_confirmation=true for every front_door_lock action.
7. If the request is ambiguous, contradictory, or unsupported,
   return an empty actions list.
8. Never claim that a device has been executed or changed state.
9. Return JSON only, with no Markdown or extra commentary.

Example:
{
  "request": "Turn off the living room lights",
  "actions": [
    {
      "action_id": "action_1",
      "device": "living_room_light",
      "command": "set_power",
      "parameters": {"power": "off"},
      "requires_confirmation": false
    }
  ]
}
"""


def create_groq_plan(request: str) -> ActionPlan:
    """Generate a structured action plan using Groq."""

    if not request or not request.strip():
        raise ValueError("Please provide a smart-home request.")

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not configured.")

    model = os.getenv("GROQ_MODEL", "openai/gpt-oss-20b")

    client = Groq(api_key=api_key)

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_INSTRUCTIONS},
                {"role": "user", "content": request},
            ],
            response_format={"type": "json_object"},
            temperature=0,
        )

        content = response.choices[0].message.content

        if not content:
            raise ValueError("Groq returned an empty response.")

        plan = ActionPlan.model_validate_json(content)

        # Preserve the original request exactly.
        plan.request = request

        if not plan.actions:
            raise ValueError(
                "The request is unclear or unsupported. "
                "Please clarify what you want to do."
            )

        return plan

    finally:
        client.close()

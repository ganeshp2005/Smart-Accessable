
import re

from agent.schemas import Action, ActionPlan


DEVICE_PATTERNS = {
    "living_room_light": [
        r"\bliving room lights?\b",
        r"\blights?\s+in\s+the\s+living room\b",
    ],
    "bedroom_fan": [
        r"\bbedroom fan\b",
        r"\bfan\s+in\s+the\s+bedroom\b",
    ],
    "living_room_curtains": [
        r"\bliving room curtains?\b",
        r"\bcurtains?\s+in\s+the\s+living room\b",
    ],
    "front_door_lock": [
        r"\bfront door(?: lock)?\b",
    ],
}


def detect_devices(text: str) -> list[str]:
    """Find supported devices in the order they appear."""

    matches = []

    for device, patterns in DEVICE_PATTERNS.items():
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                matches.append((match.start(), device))
                break

    matches.sort(key=lambda item: item[0])
    return [device for _, device in matches]


def get_device_command_text(text: str, device: str) -> str:
    """Find the instruction associated with a particular device."""

    clauses = re.split(
        r"\s+\band\b\s+|[.!?;]+",
        text,
        flags=re.IGNORECASE,
    )

    matching_clauses = [
        clause.strip()
        for clause in clauses
        if device in detect_devices(clause)
    ]

    if len(matching_clauses) != 1:
        raise ValueError(
            f"Please give one clear instruction for {device}."
        )

    return matching_clauses[0]


def build_fallback_plan(request: str) -> ActionPlan:
    """Build a plan for supported, explicit smart-home commands."""

    if not request or not request.strip():
        raise ValueError("Please provide a smart-home request.")

    text = request.lower().strip()
    devices = detect_devices(text)

    if not devices:
        raise ValueError(
            "I couldn't identify a supported device. "
            "Please mention a supported device."
        )

    actions = []

    for index, device in enumerate(devices, start=1):
        command_text = get_device_command_text(text, device)

        if device in ("living_room_light", "bedroom_fan"):
            if re.search(
                r"\b(turn off|switch off)\b",
                command_text,
            ):
                power = "off"
            elif re.search(
                r"\b(turn on|switch on)\b",
                command_text,
            ):
                power = "on"
            else:
                raise ValueError(
                    f"Should I turn {device.replace('_', ' ')} on or off?"
                )

            action = Action(
                action_id=f"action_{index}",
                device=device,
                command="set_power",
                parameters={"power": power},
            )

        elif device == "living_room_curtains":
            if re.search(r"\b(close|shut)\b", command_text):
                position = "closed"
            elif re.search(r"\b(open)\b", command_text):
                position = "open"
            else:
                raise ValueError(
                    "Should I open or close the living room curtains?"
                )

            action = Action(
                action_id=f"action_{index}",
                device=device,
                command="set_position",
                parameters={"position": position},
            )

        else:
            if re.search(r"\b(unlock|unlocked)\b", command_text):
                lock_state = "unlocked"
            elif re.search(r"\b(lock|locked)\b", command_text):
                lock_state = "locked"
            else:
                raise ValueError(
                    "Should I lock or unlock the front door?"
                )

            action = Action(
                action_id=f"action_{index}",
                device=device,
                command="set_lock",
                parameters={"state": lock_state},
                requires_confirmation=True,
            )

        actions.append(action)

    return ActionPlan(request=request, actions=actions)

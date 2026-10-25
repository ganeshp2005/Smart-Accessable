
from agent.schemas import ActionPlan


def validate_plan(plan: ActionPlan) -> ActionPlan:
    """Validate basic safety constraints before backend submission."""

    seen_action_ids = set()
    seen_devices = set()

    for action in plan.actions:
        if action.action_id in seen_action_ids:
            raise ValueError("Duplicate action IDs are not allowed.")
        seen_action_ids.add(action.action_id)

        if action.device in seen_devices:
            raise ValueError(
                f"Multiple actions for {action.device} require clarification."
            )
        seen_devices.add(action.device)

        if action.device in {
            "living_room_light",
            "bedroom_fan",
        }:
            if action.command != "set_power":
                raise ValueError(
                    f"Invalid command for device {action.device}."
                )

            if action.parameters.get("power") not in {"on", "off"}:
                raise ValueError("Power must be 'on' or 'off'.")

        elif action.device == "living_room_curtains":
            if action.command != "set_position":
                raise ValueError("Invalid command for living room curtains.")

            if action.parameters.get("position") not in {"open", "closed"}:
                raise ValueError(
                    "Curtain position must be 'open' or 'closed'."
                )

        elif action.device == "front_door_lock":
            if action.command != "set_lock":
                raise ValueError("Invalid command for the front door lock.")

            if action.parameters.get("state") not in {
                "locked",
                "unlocked",
            }:
                raise ValueError(
                    "Door state must be 'locked' or 'unlocked'."
                )

            if not action.requires_confirmation:
                raise ValueError(
                    "Front door actions require explicit confirmation."
                )

    return plan

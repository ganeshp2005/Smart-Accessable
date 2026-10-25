
"""Simulated smart-home device executor for AccessAble."""

from agent.safety import validate_plan
from agent.schemas import Action, ActionPlan

try:
    from app.database import get_all_device_states, update_device_state, save_action_plan_record
    _HAS_DB = True
except Exception:
    _HAS_DB = False


# Simulated device states. These are not real physical devices.
_INITIAL_DEVICE_STATES = {
    "living_room_light": "off",
    "bedroom_fan": "off",
    "living_room_curtains": "closed",
    "front_door_lock": "locked",
}

_device_states = _INITIAL_DEVICE_STATES.copy()


def get_device_states() -> dict[str, str]:
    """Return a copy of the current simulated device states (from SQLite if available)."""
    if _HAS_DB:
        try:
            states = get_all_device_states()
            if states:
                return states
        except Exception:
            pass
    return _device_states.copy()


def reset_device_states() -> None:
    """Reset all simulated devices to their initial states."""
    _device_states.clear()
    _device_states.update(_INITIAL_DEVICE_STATES)
    if _HAS_DB:
        try:
            for dev, st in _INITIAL_DEVICE_STATES.items():
                update_device_state(dev, st)
        except Exception:
            pass


def _execute_action(action: Action) -> str:
    """Execute one already-validated simulated device action."""

    if action.device in {
        "living_room_light",
        "bedroom_fan",
    }:
        state = action.parameters["power"]

    elif action.device == "living_room_curtains":
        state = action.parameters["position"]

    elif action.device == "front_door_lock":
        state = action.parameters["state"]

    else:
        # Defensive check in case the supported devices change later.
        raise ValueError(f"Unsupported device: {action.device}")

    _device_states[action.device] = state
    if _HAS_DB:
        try:
            update_device_state(action.device, state)
        except Exception:
            pass
    return state


def execute_plan(
    plan: ActionPlan,
    confirmed_action_ids: set[str] | None = None,
) -> dict:
    """
    Execute a validated plan against simulated devices.

    Front-door actions are never executed unless:
    1. The plan marks the action as requiring confirmation.
    2. Its action ID is explicitly included in confirmed_action_ids.

    Unconfirmed door actions remain pending. Other valid actions in the
    same plan can still execute.
    """

    # Validate the complete plan before changing any device state.
    validate_plan(plan)

    if confirmed_action_ids is None:
        confirmed_action_ids = set()

    results = []

    for action in plan.actions:

        # Never operate the front door without explicit confirmation.
        if action.device == "front_door_lock":
            if (
                not action.requires_confirmation
                or action.action_id not in confirmed_action_ids
            ):
                results.append({
                    "action_id": action.action_id,
                    "device": action.device,
                    "status": "confirmation_required",
                    "message": (
                        "Front-door action is pending explicit "
                        "user confirmation. No change was made."
                    ),
                })
                continue

        new_state = _execute_action(action)

        results.append({
            "action_id": action.action_id,
            "device": action.device,
            "status": "executed",
            "new_state": new_state,
        })

    response = {
        "request": plan.request,
        "results": results,
        "device_states": get_device_states(),
    }

    if _HAS_DB:
        try:
            save_action_plan_record(plan.request, plan.model_dump_json(), "executed")
        except Exception:
            pass

    return response

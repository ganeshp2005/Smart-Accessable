
import unittest

from agent.executor import (
    execute_plan,
    get_device_states,
    reset_device_states,
)
from agent.fallback import build_fallback_plan
from agent.schemas import Action, ActionPlan


class TestSmartHomeExecutor(unittest.TestCase):

    def setUp(self):
        reset_device_states()

    def test_initial_device_states(self):
        states = get_device_states()

        self.assertEqual(states["living_room_light"], "off")
        self.assertEqual(states["bedroom_fan"], "off")
        self.assertEqual(states["living_room_curtains"], "closed")
        self.assertEqual(states["front_door_lock"], "locked")

    def test_light_executes(self):
        plan = build_fallback_plan(
            "Turn on the living room lights"
        )

        result = execute_plan(plan)

        self.assertEqual(
            get_device_states()["living_room_light"], "on"
        )
        self.assertEqual(result["results"][0]["status"], "executed")

    def test_fan_executes(self):
        plan = build_fallback_plan(
            "Turn on the bedroom fan"
        )

        execute_plan(plan)

        self.assertEqual(
            get_device_states()["bedroom_fan"], "on"
        )

    def test_curtains_execute(self):
        plan = build_fallback_plan(
            "Open the living room curtains"
        )

        execute_plan(plan)

        self.assertEqual(
            get_device_states()["living_room_curtains"], "open"
        )

    def test_door_waits_without_confirmation(self):
        plan = ActionPlan(
            request="Unlock the front door",
            actions=[
                Action(
                    action_id="door_1",
                    device="front_door_lock",
                    command="set_lock",
                    parameters={"state": "unlocked"},
                    requires_confirmation=True,
                )
            ],
        )

        result = execute_plan(plan)

        self.assertEqual(
            result["results"][0]["status"],
            "confirmation_required",
        )
        self.assertEqual(
            get_device_states()["front_door_lock"], "locked"
        )

    def test_door_executes_after_explicit_confirmation(self):
        plan = ActionPlan(
            request="Unlock the front door",
            actions=[
                Action(
                    action_id="door_1",
                    device="front_door_lock",
                    command="set_lock",
                    parameters={"state": "unlocked"},
                    requires_confirmation=True,
                )
            ],
        )

        result = execute_plan(
            plan,
            confirmed_action_ids={"door_1"},
        )

        self.assertEqual(
            result["results"][0]["status"], "executed"
        )
        self.assertEqual(
            get_device_states()["front_door_lock"], "unlocked"
        )

    def test_confirmation_for_wrong_action_id_is_rejected(self):
        plan = ActionPlan(
            request="Unlock the front door",
            actions=[
                Action(
                    action_id="door_1",
                    device="front_door_lock",
                    command="set_lock",
                    parameters={"state": "unlocked"},
                    requires_confirmation=True,
                )
            ],
        )

        result = execute_plan(
            plan,
            confirmed_action_ids={"some_other_action"},
        )

        self.assertEqual(
            result["results"][0]["status"],
            "confirmation_required",
        )
        self.assertEqual(
            get_device_states()["front_door_lock"], "locked"
        )

    def test_invalid_plan_changes_no_device_states(self):
        plan = ActionPlan(
            request="Invalid light command",
            actions=[
                Action(
                    action_id="bad_1",
                    device="living_room_light",
                    command="set_power",
                    parameters={"power": "maybe"},
                )
            ],
        )

        before = get_device_states()

        with self.assertRaises(ValueError):
            execute_plan(plan)

        self.assertEqual(get_device_states(), before)


if __name__ == "__main__":
    unittest.main()

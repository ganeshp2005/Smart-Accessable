
import unittest


from agent.safety import validate_plan
from agent.fallback import build_fallback_plan


class TestFallbackPlanner(unittest.TestCase):

    def test_single_light_command(self):
        plan = build_fallback_plan("Turn off the living room lights")

        self.assertEqual(len(plan.actions), 1)
        self.assertEqual(
            plan.actions[0].device, "living_room_light"
        )
        self.assertEqual(
            plan.actions[0].parameters["power"], "off"
        )

    def test_multi_step_sleep_command(self):
        plan = build_fallback_plan(
            "I'm going to sleep. Turn off the living room lights "
            "and turn on the bedroom fan."
        )

        self.assertEqual(len(plan.actions), 2)
        self.assertEqual(
            [action.device for action in plan.actions],
            ["living_room_light", "bedroom_fan"],
        )
        self.assertEqual(
            [action.parameters["power"] for action in plan.actions],
            ["off", "on"],
        )

    def test_curtains_command(self):
        plan = build_fallback_plan("Close the living room curtains")

        self.assertEqual(
            plan.actions[0].parameters["position"], "closed"
        )

    def test_front_door_requires_confirmation(self):
        plan = build_fallback_plan("Lock the front door")

        self.assertTrue(
            plan.actions[0].requires_confirmation
        )
        self.assertEqual(
            plan.actions[0].parameters["state"], "locked"
        )

    def test_unknown_device_is_rejected(self):
        with self.assertRaises(ValueError):
            build_fallback_plan("Turn on the kitchen lights")

    def test_ambiguous_command_is_rejected(self):
        with self.assertRaises(ValueError):
            build_fallback_plan("Do something with the bedroom fan")

    def test_valid_plan_passes_safety(self):
        plan = build_fallback_plan(
            "Turn off the living room lights"
        )
        self.assertIs(validate_plan(plan), plan)

    def test_door_action_without_confirmation_is_rejected(self):
        plan = build_fallback_plan("Lock the front door")
        plan.actions[0].requires_confirmation = False

        with self.assertRaises(ValueError):
            validate_plan(plan)

    def test_duplicate_device_actions_are_rejected(self):
        plan = build_fallback_plan(
            "Turn off the living room lights"
        )
        duplicate = plan.actions[0].model_copy(
            update={"action_id": "action_2"}
        )
        plan.actions.append(duplicate)

        with self.assertRaises(ValueError):
            validate_plan(plan)



if __name__ == "__main__":
    unittest.main()

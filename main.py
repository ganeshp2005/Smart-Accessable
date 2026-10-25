
from agent.planner import create_action_plan


def main():
    request = input("AccessAble: What would you like me to do? ")

    try:
        plan = create_action_plan(request)
        print("\nProposed action plan:")
        print(plan.model_dump_json(indent=2))
        print("\nPlan created. No devices have been executed.")
    except ValueError as exc:
        print(f"\nClarification or validation required: {exc}")


if __name__ == "__main__":
    main()

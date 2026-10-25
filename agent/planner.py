
from agent.fallback import build_fallback_plan
from agent.groq_planner import create_groq_plan
from agent.safety import validate_plan
from agent.schemas import ActionPlan


def create_action_plan(request: str) -> ActionPlan:
    """Use Groq first, then fall back to local rules if needed."""

    if not request or not request.strip():
        raise ValueError("Please provide a smart-home request.")

    try:
        plan = create_groq_plan(request)
    except Exception as exc:
        print(
            f"\nGroq unavailable ({type(exc).__name__}). "
            "Trying the rule-based fallback..."
        )
        plan = build_fallback_plan(request)

    return validate_plan(plan)

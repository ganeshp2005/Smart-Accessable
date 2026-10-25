
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


DeviceName = Literal[
    "living_room_light",
    "bedroom_fan",
    "living_room_curtains",
    "front_door_lock",
]

CommandName = Literal[
    "set_power",
    "set_position",
    "set_lock",
]


class Action(BaseModel):
    """One proposed smart-home action."""

    model_config = ConfigDict(extra="forbid")

    action_id: str = Field(min_length=1)
    device: DeviceName
    command: CommandName
    parameters: dict[str, str]
    requires_confirmation: bool = False


class ActionPlan(BaseModel):
    """A structured plan produced by the AI agent."""

    model_config = ConfigDict(extra="forbid")

    request: str = Field(min_length=1)
    actions: list[Action] = Field(max_length=10)

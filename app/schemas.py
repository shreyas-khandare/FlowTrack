from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str


class TaskCreate(BaseModel):
    title: str


# schemas.py defines how data is allowed to enter and leave your API
# “Schemas define the structure and validation of request and response data using Pydantic.”
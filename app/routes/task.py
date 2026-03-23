from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import get_db
from utils.auth import get_current_user

router = APIRouter()


@router.post("/tasks")
def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    new_task = models.Task(
        title=task.title,
        owner_id=user["user_id"]
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/tasks")
def get_tasks(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return db.query(models.Task).filter(
        models.Task.owner_id == user["user_id"]
    ).all()


@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    task: schemas.TaskCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == user["user_id"]
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.title = task.title

    db.commit()
    db.refresh(db_task)

    return db_task


@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    db_task = db.query(models.Task).filter(
        models.Task.id == task_id,
        models.Task.owner_id == user["user_id"]
    ).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()

    return {"message": "Task deleted"}
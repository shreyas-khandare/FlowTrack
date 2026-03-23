from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import get_db
from utils.auth import hash_password, verify_password, create_access_token

router = APIRouter()


@router.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):

    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Validate password length (bcrypt limit)
    if len(user.password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password too long (max 72 characters)"
        )

    # Hash password
    try:
        hashed_password = hash_password(user.password)
    except Exception:
        raise HTTPException(status_code=500, detail="Error hashing password")

    # Create user
    new_user = models.User(email=user.email, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    # User existence check
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    # Password verification
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Generate token
    token = create_access_token({"user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }
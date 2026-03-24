from fastapi import FastAPI
from database import engine, Base
from routes import user, task
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TEMP: ensure it works
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "API running"}

app.include_router(user.router)
app.include_router(task.router)
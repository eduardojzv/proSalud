from typing import Union
from fastapi import FastAPI
from models.models import Jobs
from db import conn
app = FastAPI()


@app.get("/")
def get_jobs():
    conn.execute(Jobs.select()).fetchall()
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
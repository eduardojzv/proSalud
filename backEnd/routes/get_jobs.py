from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.jobs import Jobs
from db import get_db   # get_db es una dependencia para obtener la sesión
router_get_jobs = APIRouter()

@router_get_jobs.get("/get-all-jobs")
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Jobs).all()  # Consulta para obtener todos los trabajos
    return {"data": jobs}

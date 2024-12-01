from fastapi import APIRouter, Depends
from models.jobs import Countries
from sqlalchemy.orm import Session
from db import get_session

router_get_locations = APIRouter()

@router_get_locations.get("/get-countries")
def get_countries(db: Session = Depends(get_session)):
    """
    Endpoint para obtener todos los países.
    """
    try:
        # Realizar la consulta
        countries = db.query(Countries).all()
        # Formatear los resultados (si es necesario)
        result = [{"id": country.id, "value": country.country_name} for country in countries]
        return {"countries": result}
    except Exception as e:
        print("Error:", e)
        return {"error": str(e)}

from fastapi import APIRouter, Depends
from models.jobs import Countries,Provinces
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
@router_get_locations.get("/get-provinces")
def get_provinces(db: Session = Depends(get_session), country_id: str = None):
    """
    Endpoint para obtener todas las provincias o las provincias de un país específico.
    """
    try:
        # Realizar la consulta con o sin filtro
        query = db.query(Provinces)
        if country_id:
            query = query.filter(Provinces.country_id == country_id)
        
        # Ejecutar la consulta
        provinces = query.all()

        # Formatear los resultados
        result = [{"id": province.id, "value": province.province_name} for province in provinces]

        return {"provinces": result}

    except Exception as e:
        # Registrar y retornar el error
        print("Error:", e)
        return {"error": str(e)}

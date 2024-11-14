from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.jobs import Jobs
from models.jobs import Titles, Descriptions, Categories, Subcategories, Sectors, Requirements, Images, Jobs, Countries,Departments,ProfessionalLevels,Provinces,Cantons

from db import get_db,engine   # get_db es una dependencia para obtener la sesión
router_get_jobs = APIRouter()

@router_get_jobs.get("/get-all-jobs")
def get_jobs(db: Session = Depends(get_db)):
    try:
        with Session(engine) as session:
            jobs = session.query(
                Jobs.id,
                Jobs.vacancies,
                Titles.title.label("title"),
                Jobs.position,
                Jobs.state,
                Jobs.slug,
                Departments.department_name.label("department"),
                ProfessionalLevels.level_name.label("professional_level"),
                Jobs.working_day,
                Jobs.salary_min,
                Jobs.salary_max,
                Categories.category_name.label("category"),
                Subcategories.subcategory_name.label("subcategory"),
                Sectors.sector_name.label("sector"),
                Countries.country_name.label("country"),
                Provinces.province_name.label("province"),
                Cantons.canton_name.label("canton")
            ).join(Titles, Jobs.title_id == Titles.id) \
            .join(Departments, Jobs.department_id == Departments.id) \
            .join(ProfessionalLevels, Jobs.professional_level_id == ProfessionalLevels.id) \
            .join(Categories, Jobs.category_id == Categories.id) \
            .join(Subcategories, Jobs.subcategory_id == Subcategories.id) \
            .join(Sectors, Jobs.sector_id == Sectors.id) \
            .join(Countries, Jobs.country_id == Countries.id) \
            .join(Provinces, Jobs.province_id == Provinces.id) \
            .join(Cantons, Jobs.canton_id == Cantons.id) \
            .all()

            # Formatear los datos para la respuesta
            result = [
                {
                    "id": job.id,
                    "vacancies": job.vacancies,
                    "title": job.title,
                    "position": job.position,
                    "state": job.state,
                    "slug": job.slug,
                    "department": job.department,
                    "professional_level": job.professional_level,
                    "working_day": job.working_day,
                    "salary_min": job.salary_min,
                    "salary_max": job.salary_max,
                    "category": job.category,
                    "subcategory": job.subcategory,
                    "sector": job.sector,
                    "country": job.country,
                    "province": job.province,
                    "canton": job.canton,
                }
                for job in jobs
            ]

            return {"jobs": result}
    except Exception as e:
        return {"error": str(e)}

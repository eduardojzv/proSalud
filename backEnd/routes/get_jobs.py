from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from models.jobs import (
    Jobs, Titles, Categories, Subcategories, Sectors, Departments,
    ProfessionalLevels, Countries, Provinces, Cantons, Positions,
    Requirements, job_requirements, Images
)
from db import get_session

router_get_jobs = APIRouter()

@router_get_jobs.get("/get-all-jobs")
def get_jobs(
    limit: int = Query(5, le=100, ge=5, alias="limit"),
    offset: int = Query(0, ge=0, alias="offset"),
    categories: Optional[str] = Query(None, alias="categories"),
    country: Optional[List[str]] = Query(None, alias="country"),
    province: Optional[str] = Query(None, alias="province"),
    canton: Optional[str] = Query(None, alias="canton"),
    db: Session = Depends(get_session),
):
    print("eee",country)
    try:
        with db as session:
            # Construir la consulta base
            base_query = session.query(
                Jobs.id.label("id"),
                Jobs.vacancies,
                Titles.title.label("title"),
                Images.image_url.label("image_url"),
                Positions.position_name.label("position"),
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
                Cantons.canton_name.label("canton"),
                func.group_concat(Requirements.requirement).label("requirements"),
            )\
            .join(Titles, Jobs.title_id == Titles.id, isouter=True)\
            .join(Positions, Jobs.position_id == Positions.id, isouter=True)\
            .join(Images, Jobs.list_image_id == Images.id, isouter=True)\
            .join(Departments, Jobs.department_id == Departments.id, isouter=True)\
            .join(ProfessionalLevels, Jobs.professional_level_id == ProfessionalLevels.id, isouter=True)\
            .join(Categories, Jobs.category_id == Categories.id, isouter=True)\
            .join(Subcategories, Jobs.subcategory_id == Subcategories.id, isouter=True)\
            .join(Sectors, Jobs.sector_id == Sectors.id, isouter=True)\
            .join(Countries, Jobs.country_id == Countries.id, isouter=True)\
            .join(Provinces, Jobs.province_id == Provinces.id, isouter=True)\
            .join(Cantons, Jobs.canton_id == Cantons.id, isouter=True)\
            .join(job_requirements, Jobs.id == job_requirements.c.job_id, isouter=True)\
            .join(Requirements, job_requirements.c.requirement_id == Requirements.id, isouter=True)\
            .group_by(
                Jobs.id, Titles.title, Positions.position_name, Jobs.vacancies,
                Jobs.state, Jobs.slug, Departments.department_name, ProfessionalLevels.level_name,
                Jobs.working_day, Jobs.salary_min, Jobs.salary_max,
                Categories.category_name, Subcategories.subcategory_name, Sectors.sector_name,
                Countries.country_name, Provinces.province_name, Cantons.canton_name
            )

            # Aplicar filtros dinámicos
            if categories:
                base_query = base_query.filter(Categories.category_name.in_(categories.split(',')))
            if country:
                base_query = base_query.filter(Countries.country_name.in_(country))
            if province:
                base_query = base_query.filter(Provinces.province_name == province)
            if canton:
                base_query = base_query.filter(Cantons.canton_name == canton)
            # Obtener el total de trabajos después de aplicar los filtros, sin paginación
            total_jobs_query = session.query(func.count(Jobs.id)).filter(base_query.exists())
            total_jobs = total_jobs_query.scalar()
            print("base queru",total_jobs_query.scalar())
            # Aplicar paginación
            paginated_query = base_query.offset(offset).limit(limit)

            # Ejecutar la consulta para obtener los trabajos
            jobs = paginated_query.all()

            # Formatear los datos para la respuesta
            result = [
                {
                    "id": job.id,
                    "vacancies": job.vacancies,
                    "title": job.title,
                    "position": job.position,
                    "image_url": job.image_url,
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
                    "requirements": job.requirements.split(",") if job.requirements else []
                }
                for job in jobs
            ]

            return {"jobs": result, "totalJobs": total_jobs}
    except Exception as e:
        session.rollback()
        print("Error:", e)
        return {"error": str(e)}

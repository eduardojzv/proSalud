import random
from sqlalchemy.orm import Session
from models.jobs import (
    Titles, Descriptions, Categories, Subcategories, Sectors,
    Requirements, Images, Jobs, Departments,
    ProfessionalLevels, Skills,Cantons,Positions,Competencies
)
from db import engine
from fastapi import APIRouter
# Lista de imágenes
list_images = ['/flequeador.jpg', '/listImg.jpg']
router_insert_jobs = APIRouter()
########    AGREGAR DATOS A LA TABLA INTERMEDIA
@router_insert_jobs.post("/insert_jobs")
def insertar_datos_de_prueba(
    n_jobs: int,
    n_departments: int,
    n_levels: int,
    n_titles: int,
    n_categories: int,
    n_subcategories: int,
    n_sectors: int,
    n_requirements: int,
    n_descriptions: int,
    n_skills: int,
    n_positions:int,
    n_competencies:int
    
):
    with Session(engine) as session:
        try:
            # Insertar datos en competence
            for i in range(1, n_competencies + 1):
                competence = Competencies(competence=f"competence{i}")
                session.add(competence)
            # Insertar datos en positiobs
            for i in range(1, n_positions + 1):
                position = Positions(position_name=f"position{i}")
                session.add(position)
            # Insertar datos en Departments
            for i in range(1, n_departments + 1):
                department = Departments(department_name=f"department{i}")
                session.add(department)

            # Insertar datos en ProfessionalLevels
            for i in range(1, n_levels + 1):
                level = ProfessionalLevels(level_name=f"level{i}")
                session.add(level)

            # Insertar datos en Titles
            for i in range(1, n_titles + 1):
                title = Titles(title=f"title{i}")
                session.add(title)

            # Insertar datos en Categories
            for i in range(1, n_categories + 1):
                category = Categories(category_name=f"category{i}")
                session.add(category)
            session.commit()

            # Insertar datos en Subcategories
            categories = session.query(Categories).all()
            for i in range(1, n_subcategories + 1):
                subcategory = Subcategories(
                    subcategory_name=f"subcategory{i}",
                    category_id=random.choice(categories).id
                )
                session.add(subcategory)

            # Insertar datos en Sectors
            for i in range(1, n_sectors + 1):
                sector = Sectors(sector_name=f"sector{i}")
                session.add(sector)

            # Insertar datos en Requirements
            for i in range(1, n_requirements + 1):
                requirement = Requirements(requirement=f"requirement{i}")
                session.add(requirement)

            # Insertar datos en Descriptions
            for i in range(1, n_descriptions + 1):
                description = Descriptions(description=f"description{i}")
                session.add(description)

            # Insertar datos en Skills
            for i in range(1, n_skills + 1):
                skill = Skills(skill_name=f"skill{i}")
                session.add(skill)
            #insertar imagenes
            images = [Images(image_url="/listImg.jpg"), Images(image_url="/flequeador.jpg")]
            session.add_all(images)
            #
            session.commit()

            # Insertar datos en Jobs
            departments = session.query(Departments).all()
            levels = session.query(ProfessionalLevels).all()
            titles = session.query(Titles).all()
            categories = session.query(Categories).all()
            subcategories = session.query(Subcategories).all()
            sectors = session.query(Sectors).all()
            descriptions = session.query(Descriptions).all()
            requirements = session.query(Requirements).all()
            skills = session.query(Skills).all()
            cantons = session.query(Cantons).all()
            positions=session.query(Positions).all()
            competencies=session.query(Competencies).all()

            for i in range(1, n_jobs + 1):
                canton = random.choice(cantons)
                job = Jobs(
                    vacancies=random.randint(1, 10),
                    
                    list_image_id=random.choice(images).id,  # Lógica para imágenes si las tienes
                    presentation_img_id=random.choice(images).id,
                    title_id=random.choice(titles).id,
                    position_id=random.choice(positions).id,
                    state=bool(i % 2),
                    slug=f"job-slug-{i}",
                    department_id=random.choice(departments).id,
                    professional_level_id=random.choice(levels).id,
                    working_day=f"working_day{i}",
                    salary_min=random.randint(20000, 50000),
                    salary_max=random.randint(50001, 100000),
                    category_id=random.choice(categories).id,
                    subcategory_id=random.choice(subcategories).id,
                    sector_id=random.choice(sectors).id,
                    country_id=canton.province.country.id,
                    province_id=canton.province.id,
                    canton_id=canton.id,
                )
                job.descriptions = random.sample(descriptions, k=min(3, len(descriptions)))
                job.requirements = random.sample(requirements, k=min(3, len(requirements)))
                job.skills = random.sample(skills, k=min(3, len(skills)))
                job.competencies = random.sample(competencies, k=min(3, len(competencies)))

                session.add(job)

            session.commit()
            return {"message": "Datos de prueba insertados exitosamente"}

        except Exception as e:
            session.rollback()
            return {"error": str(e)}

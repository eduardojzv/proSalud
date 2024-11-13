import random
from sqlalchemy.orm import Session
from models.jobs import Titles, Descriptions, Categories, Subcategories, Sectors, Requirements, Images, Jobs, Countries
from db import engine
from enum import Enum
from fastapi import APIRouter
router_insert_jobs=APIRouter()
class StateType(Enum):
    ACTIVO = "activo"
    INACTIVO = "inactivo"
@router_insert_jobs.post("/insert_jobs")
def insertar_datos_de_prueba(n: int):
    with Session(engine) as session:
        # 1. Crear datos en tablas relacionadas si no existen
        # Insertar títulos
        titles = [Titles(title=f"Title {i}") for i in range(1, n+1)]
        session.add_all(titles)

        # Insertar descripciones
        descriptions = [Descriptions(description=f"Description {i}") for i in range(1, n+1)]
        session.add_all(descriptions)

        # Insertar categorías y subcategorías
        categories = [Categories(category_name=f"Category {i}") for i in range(1, n+1)]
        session.add_all(categories)
        session.commit()  # Guardamos aquí para crear las categorías primero

        subcategories = [
            Subcategories(subcategory_name=f"Subcategory {i}", category_id=random.choice(categories).id)
            for i in range(1, n+1)
        ]
        session.add_all(subcategories)

        # Insertar sectores
        sectors = [Sectors(sector_name=f"Sector {i}") for i in range(1, n+1)]
        session.add_all(sectors)

        # Insertar requerimientos
        requirements = [Requirements(requirement=f"Requirement {i}") for i in range(1, n+1)]
        session.add_all(requirements)

        # Insertar imágenes
        images = [Images(image_url="/listImg.jpg"),Images(image_url="/flequeador.jgp")]
        session.add_all(images)

        session.commit()  # Guardar los datos creados

        # 2. Crear trabajos con referencias a títulos, descripciones, etc.
        jobs = []
        countries = session.query(Countries).all()

        for i in range(1, n+1):
            # Seleccionar país, provincia y cantón aleatoriamente
            country = random.choice(countries)
            province = random.choice(country.provinces)
            canton = random.choice(province.cantons)

            # Crear un trabajo
            job = Jobs(
                vacancies=random.randint(1, 10),
                title_id=random.choice(titles).id,
                position=f"Position {i}",
                state=random.choice([StateType.ACTIVO, StateType.INACTIVO]),
                slug=f"job-{i}",
                department=f"Department {i}",
                professionalLevel=f"Professional Level {i}",
                workingDay="Full Time",
                salary_min=random.randint(30000, 50000),
                salary_max=random.randint(50001, 70000),
                list_image_id=random.choice(images).id,
                presentation_img_id=random.choice(images).id,
                category_id=random.choice(categories).id,
                subcategory_id=random.choice(subcategories).id,
                sector_id=random.choice(sectors).id,
                country_id=country.id,
                province_id=province.id,
                canton_id=canton.id,
            )
            jobs.append(job)

        session.add_all(jobs)
        session.commit()  # Guardar los trabajos

    # Retornar mensaje de éxito
    return {"message": f"Se han insertado {n} trabajos de prueba exitosamente."}

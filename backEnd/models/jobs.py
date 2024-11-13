from sqlalchemy import Column, String, Integer, ForeignKey, Enum, Text, Table
from sqlalchemy.orm import relationship, DeclarativeBase
from enum import Enum as PyEnum
from db import engine

# Declarative base class
class Base(DeclarativeBase):
    pass

# Enumeración para valores predefinidos
class StateType(PyEnum):
    ACTIVO = "activo"
    INACTIVO = "inactivo"
# Modelo de País
class Countries(Base):
    __tablename__ = 'countries'
    id = Column(Integer, primary_key=True)
    country_name = Column(String(30), nullable=False, unique=True)

    # Relación con Provincias
    provinces = relationship("Provinces", back_populates="country")

# Modelo de Provincia
class Provinces(Base):
    __tablename__ = 'provinces'
    id = Column(Integer, primary_key=True)
    province_name = Column(String(40), nullable=False)
    country_id = Column(Integer, ForeignKey('countries.id'))

    # Relación con País y Cantones
    country = relationship("Countries", back_populates="provinces")
    cantons = relationship("Cantons", back_populates="province")

# Modelo de Cantón
class Cantons(Base):
    __tablename__ = 'cantons'
    id = Column(Integer, primary_key=True)
    canton_name = Column(String(40), nullable=False)
    province_id = Column(Integer, ForeignKey('provinces.id'))

    # Relación con Provincia
    province = relationship("Provinces", back_populates="cantons")
# Modelo de Titles
class Titles(Base):
    __tablename__ = 'titles'
    id = Column(Integer, primary_key=True)
    title = Column(String(50), nullable=False, unique=True)

# Modelo de Descriptions
class Descriptions(Base):
    __tablename__ = 'descriptions'
    id = Column(Integer, primary_key=True)
    description = Column(Text, nullable=False)

# Modelo de Categories
class Categories(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    category_name = Column(String(50), nullable=False, unique=True)

# Modelo de Subcategories
class Subcategories(Base):
    __tablename__ = 'subcategories'
    id = Column(Integer, primary_key=True)
    subcategory_name = Column(String(50), nullable=False, unique=True)
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship("Categories", back_populates="subcategories")

Categories.subcategories = relationship("Subcategories", order_by=Subcategories.id, back_populates="category")

# Modelo de Sectors
class Sectors(Base):
    __tablename__ = 'sectors'
    id = Column(Integer, primary_key=True)
    sector_name = Column(String(50), nullable=False, unique=True)

# Modelo de Requirements
class Requirements(Base):
    __tablename__ = 'requirements'
    id = Column(Integer, primary_key=True)
    requirement = Column(Text, nullable=False)

# Tabla intermedia para Jobs y Descriptions
job_descriptions = Table('job_descriptions', Base.metadata,
    Column('job_id', Integer, ForeignKey('jobs.id')),
    Column('description_id', Integer, ForeignKey('descriptions.id'))
)

# Tabla intermedia para Jobs y Requirements
job_requirements = Table('job_requirements', Base.metadata,
    Column('job_id', Integer, ForeignKey('jobs.id')),
    Column('requirement_id', Integer, ForeignKey('requirements.id'))
)

# Modelo de Images
class Images(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    image_url = Column(Text, nullable=False)

# Modelo de Jobs
# Modelo de Jobs
class Jobs(Base):
    __tablename__ = 'jobs'
    id = Column(Integer, primary_key=True)
    vacancies = Column(Integer, nullable=False)
    list_image_id = Column(Integer, ForeignKey('images.id'))
    presentation_img_id = Column(Integer, ForeignKey('images.id'))
    title_id = Column(Integer, ForeignKey('titles.id'))
    position = Column(String(50), nullable=False)
    state = Column(Enum(StateType), nullable=False)
    slug = Column(Text, nullable=False)
    department = Column(String(50))
    professionalLevel = Column(String(50))
    workingDay = Column(String(50), nullable=False)
    salary_min = Column(Integer)  # Salario mínimo
    salary_max = Column(Integer)  # Salario máximo
    category_id = Column(Integer, ForeignKey('categories.id'))
    subcategory_id = Column(Integer, ForeignKey('subcategories.id'))
    sector_id = Column(Integer, ForeignKey('sectors.id'))
    
    # Nuevas relaciones de ubicación
    country_id = Column(Integer, ForeignKey('countries.id'))
    province_id = Column(Integer, ForeignKey('provinces.id'))
    canton_id = Column(Integer, ForeignKey('cantons.id'))

    # Relaciones con tablas relacionadas
    title = relationship("Titles")
    category = relationship("Categories")
    subcategory = relationship("Subcategories")
    sector = relationship("Sectors")
    descriptions = relationship("Descriptions", secondary=job_descriptions, backref="jobs")
    requirements = relationship("Requirements", secondary=job_requirements, backref="jobs")
    country = relationship("Countries")
    province = relationship("Provinces")
    canton = relationship("Cantons")
# Crea todas las tablas en la base de datos
Base.metadata.create_all(engine)

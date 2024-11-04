from sqlalchemy import Column, String, Integer, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship,DeclarativeBase
from enum import Enum as PyEnum
from fastapi import APIRouter
from db import engine
#declarative base class
class Base(DeclarativeBase):
    pass
jobAPI=APIRouter()
# Enumeraciones para valores predefinidos
class StateType(PyEnum):
    ACTIVO = "activo"
    INACTIVO = "inactivo"
# Modelo de Titles
class Titles(Base):
    __tablename__ = 'titles'
    id = Column(Integer, primary_key=True)
    title_es = Column(String(255), nullable=False)
    title_en = Column(String(255))

# Modelo de Descriptions
class Descriptions(Base):
    __tablename__ = 'descriptions'
    id = Column(Integer, primary_key=True)
    description_es = Column(Text, nullable=False)
    description_en = Column(Text)

# Modelo de Categories
class Categories(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    category_name = Column(String(255), nullable=False)

# Modelo de Subcategories
class Subcategories(Base):
    __tablename__ = 'subcategories'
    id = Column(Integer, primary_key=True)
    subcategory_name = Column(String(255), nullable=False)
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship("Category", back_populates="subcategories")

Categories.subcategories = relationship("Subcategory", order_by=Subcategories.id, back_populates="category")

# Modelo de Sectors
class Sectors(Base):
    __tablename__ = 'sectors'
    id = Column(Integer, primary_key=True)
    sector_name = Column(String(255), nullable=False)

# Modelo de Requirements
class Requirements(Base):
    __tablename__ = 'requirements'
    id = Column(Integer, primary_key=True)
    requirement_es = Column(Text, nullable=False)
    requirement_en = Column(Text)

# Modelo de Jobs
class Jobs(Base):
    __tablename__ = 'jobs'
    id = Column(Integer, primary_key=True)
    vacancies = Column(Integer, nullable=False)
    list_image_url = Column(String(255))
    presentationImg = Column(String(255))
    title_id = Column(Integer, ForeignKey('titles.id'))
    description_id = Column(Integer, ForeignKey('descriptions.id'))
    position = Column(String(50), nullable=False)
    state = Column(Enum(StateType), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    department = Column(String(255))
    professionalLevel = Column(String(255))
    workingDay = Column(String(50), nullable=False)
    city = Column(String(255))
    category_id = Column(Integer, ForeignKey('categories.id'))
    subcategory_id = Column(Integer, ForeignKey('subcategories.id'))
    sector_id = Column(Integer, ForeignKey('sectors.id'))
    minimumRequirements_id = Column(Integer, ForeignKey('requirements.id'))

    # Relaciones con tablas relacionadas
    title = relationship("Title")
    description = relationship("Description")
    category = relationship("Category")
    subcategory = relationship("Subcategory")
    sector = relationship("Sector")
    minimumRequirements = relationship("Requirement")
#
Base.metadata.create_all(engine)
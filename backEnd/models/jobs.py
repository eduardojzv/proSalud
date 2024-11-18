from sqlalchemy import Column, String, Integer, ForeignKey,Boolean, Text, Table
from sqlalchemy.orm import relationship, DeclarativeBase
from db import engine

# Declarative base class
class Base(DeclarativeBase):
    pass
# Tabla intermedia para Jobs y Skills (relación de muchos a muchos)
job_skills = Table(
    'job_skills', Base.metadata,
    Column('job_id', Integer, ForeignKey('jobs.id')),
    Column('skill_id', Integer, ForeignKey('skills.id'))
)
# Modelo de Skills
class Skills(Base):
    __tablename__ = 'skills'
    id = Column(Integer, primary_key=True)
    skill_name = Column(String(50), nullable=False, unique=True)
# Modelo de País
class Countries(Base):
    __tablename__ = 'countries'
    id = Column(Integer, primary_key=True)
    country_name = Column(String(30), nullable=False, unique=True)
    provinces = relationship("Provinces", back_populates="country")

# Modelo de Provincia
class Provinces(Base):
    __tablename__ = 'provinces'
    id = Column(Integer, primary_key=True)
    province_name = Column(String(40), nullable=False)
    country_id = Column(Integer, ForeignKey('countries.id'))
    country = relationship("Countries", back_populates="provinces")
    cantons = relationship("Cantons", back_populates="province")

# Modelo de Cantón
class Cantons(Base):
    __tablename__ = 'cantons'
    id = Column(Integer, primary_key=True)
    canton_name = Column(String(40), nullable=False)
    province_id = Column(Integer, ForeignKey('provinces.id'))
    province = relationship("Provinces", back_populates="cantons")

# Modelo de Titles
class Titles(Base):
    __tablename__ = 'titles'
    id = Column(Integer, primary_key=True)
    title = Column(String(30), nullable=False, unique=True)
# Modelo de competencies
class Competencies(Base):
    __tablename__ = 'competencies'
    id = Column(Integer, primary_key=True)
    competence = Column(Text, nullable=False)
# Tabla intermedia para Jobs y Descriptions (relación de muchos a muchos)
job_competencies = Table(
    'job_competencies', Base.metadata,
    Column('job_id', Integer, ForeignKey('jobs.id')),
    Column('competencies_id', Integer, ForeignKey('competencies.id'))
)
# Modelo de Descriptions
class Descriptions(Base):
    __tablename__ = 'descriptions'
    id = Column(Integer, primary_key=True)
    description = Column(Text, nullable=False)

# Modelo de Requirements
class Requirements(Base):
    __tablename__ = 'requirements'
    id = Column(Integer, primary_key=True)
    requirement = Column(Text, nullable=False)

# Tabla intermedia para Jobs y Descriptions (relación de muchos a muchos)
job_descriptions = Table(
    'job_descriptions', Base.metadata,
    Column('job_id', Integer, ForeignKey('jobs.id')),
    Column('description_id', Integer, ForeignKey('descriptions.id'))
)

# Tabla intermedia para Jobs y Requirements (relación de muchos a muchos)
job_requirements = Table(
    'job_requirements', Base.metadata,
    Column('job_id', Integer, ForeignKey('jobs.id')),
    Column('requirement_id', Integer, ForeignKey('requirements.id'))
)

# Modelo de Categories
class Categories(Base):
    __tablename__ = 'categories'
    id = Column(Integer, primary_key=True)
    category_name = Column(String(30), nullable=False, unique=True)

# Modelo de Subcategories
class Subcategories(Base):
    __tablename__ = 'subcategories'
    id = Column(Integer, primary_key=True)
    subcategory_name = Column(String(30), nullable=False, unique=True)
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship("Categories", back_populates="subcategories")

Categories.subcategories = relationship("Subcategories", order_by=Subcategories.id, back_populates="category")

# Modelo de Sectors
class Sectors(Base):
    __tablename__ = 'sectors'
    id = Column(Integer, primary_key=True)
    sector_name = Column(String(40), nullable=False, unique=True)

# Modelo de Images
class Images(Base):
    __tablename__ = 'images'
    id = Column(Integer, primary_key=True)
    image_url = Column(Text, nullable=False)

# Modelo de Departments
class Departments(Base):
    __tablename__ = 'departments'
    id = Column(Integer, primary_key=True)
    department_name = Column(String(40), nullable=False, unique=True)

# Modelo de Professional Levels
class ProfessionalLevels(Base):
    __tablename__ = 'professional_levels'
    id = Column(Integer, primary_key=True)
    level_name = Column(String(40), nullable=False, unique=True)
# Modelo de position
class Positions(Base):
    __tablename__ = 'positions'
    id = Column(Integer, primary_key=True)
    position_name = Column(String(40), nullable=False, unique=True)

# Modelo de Jobs
class Jobs(Base):
    __tablename__ = 'jobs'
    id = Column(Integer, primary_key=True)
    vacancies = Column(Integer, nullable=False)
    list_image_id = Column(Integer, ForeignKey('images.id'))
    presentation_img_id = Column(Integer, ForeignKey('images.id'))
    title_id = Column(Integer, ForeignKey('titles.id'))
    position_id = Column(Integer,ForeignKey('positions.id'))
    state = Column(Boolean, nullable=False)
    slug = Column(Text, nullable=False)
    department_id = Column(Integer, ForeignKey('departments.id'))
    professional_level_id = Column(Integer, ForeignKey('professional_levels.id'))
    working_day = Column(String(50), nullable=False)
    salary_min = Column(Integer)  # Salario mínimo
    salary_max = Column(Integer)  # Salario máximo
    category_id = Column(Integer, ForeignKey('categories.id'))
    subcategory_id = Column(Integer, ForeignKey('subcategories.id'))
    sector_id = Column(Integer, ForeignKey('sectors.id'))
    
    #relaciones de ubicación
    country_id = Column(Integer, ForeignKey('countries.id'))
    province_id = Column(Integer, ForeignKey('provinces.id'))
    canton_id = Column(Integer, ForeignKey('cantons.id'))

    #tablas relacionadas
    title = relationship("Titles")
    category = relationship("Categories")
    subcategory = relationship("Subcategories")
    sector = relationship("Sectors")
    descriptions = relationship("Descriptions", secondary=job_descriptions, backref="jobs")
    requirements = relationship("Requirements", secondary=job_requirements, backref="jobs")
    country = relationship("Countries")
    province = relationship("Provinces")
    canton = relationship("Cantons")
    department = relationship("Departments")
    professional_level = relationship("ProfessionalLevels")
    skills = relationship("Skills", secondary=job_skills, backref="jobs")
    position=relationship("Positions")
    competencies = relationship("Competencies", secondary=job_competencies, backref="jobs")


    
# Crea todas las tablas en la base de datos
Base.metadata.create_all(engine)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv('.env.pro')
# Configuración de la base de datos
dev = "mysql+pymysql://root:root123@localhost:3306/ProSalud"
production = os.getenv('BD_URL')

# Seleccionar la URL de la base de datos según el modo
db_url = production if production else dev
# Crear el engine de SQLAlchemy
engine = create_engine(db_url)

# Crear una fábrica de sesiones (sessionmaker)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependencia para obtener la sesión de la base de datos
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        print("Cerrando sesión")
        session.close()

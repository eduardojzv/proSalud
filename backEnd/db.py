from sqlalchemy import create_engine
from sqlalchemy.orm import Session
# Configuración de la base de datos
dev="mysql+pymysql://root:root123@localhost:3306/ProSalud"
engine = create_engine(dev)
# Dependencia para obtener la sesión de la base de datos
def get_session():
    session = Session(engine)
    try:
        yield session
    finally:
        print("probando finally")
        session.close()
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
# Configuración de la base de datos
engine = create_engine("mysql+pymysql://root:root123@localhost:3306/ProSalud")
# Dependencia para obtener la sesión de la base de datos
def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()
#conn=engine.connect()
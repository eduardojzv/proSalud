from sqlalchemy import create_engine
from sqlalchemy.orm import Session
# Configuración de la base de datos
dev="mysql+pymysql://root:root123@localhost:3306/ProSalud"
production="postgresql://jobs_kntp_user:e2Pva1TwUGr2vXlvX8a15XP5ghU9c9e5@dpg-ct5ulml6l47c73frvjig-a.oregon-postgres.render.com/jobs_kntp"
engine = create_engine(production)
# Dependencia para obtener la sesión de la base de datos
def get_session():
    session = Session(engine)
    try:
        yield session
    finally:
        print("probando finally")
        session.close()
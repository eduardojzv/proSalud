from sqlalchemy import create_engine
from sqlalchemy.orm import Session
# Configuración de la base de datos
dev="mysql+pymysql://root:root123@localhost:3306/ProSalud"
production="mysql+pymysql://root:HFLtNtyEBgdTYcQTIDovRdsFgjiieijT@autorack.proxy.rlwy.net:59579/railway"
engine = create_engine(production)
# Dependencia para obtener la sesión de la base de datos
def get_session():
    session = Session(engine)
    try:
        yield session
    finally:
        print("probando finally")
        session.close()
from sqlalchemy import create_engine
# Configuración de la base de datos
engine = create_engine("mysql+pymysql://root:root123@localhost:3306/ProSalud")

conn=engine.connect()
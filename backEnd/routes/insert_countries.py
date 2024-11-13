from sqlalchemy.orm import Session
from models.jobs import Countries, Provinces, Cantons
from fastapi import APIRouter
from db import engine

router_insert_countries = APIRouter()

@router_insert_countries.get("/insert_countries")
def insertar_datos_paises():
    with Session(engine) as session:
        # Datos de Costa Rica
        costa_rica = Countries(country_name="Costa Rica")
        provincias_cr = [
            Provinces(province_name="San José", country=costa_rica),
            Provinces(province_name="Alajuela", country=costa_rica),
            Provinces(province_name="Cartago", country=costa_rica),
            Provinces(province_name="Heredia", country=costa_rica),
            Provinces(province_name="Guanacaste", country=costa_rica),
            Provinces(province_name="Puntarenas", country=costa_rica),
            Provinces(province_name="Limón", country=costa_rica)
        ]

        # Cantones de Costa Rica
        cantones_cr = {
            "San José": [
                "San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", 
                "Aserrí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", 
                "Vásquez de Coronado", "Acosta", "Tibás", "Moravia", 
                "Montes de Oca", "Turrubares", "Dota", "Curridabat", 
                "Pérez Zeledón", "León Cortés"
            ],
            "Alajuela": [
                "Alajuela", "San Carlos", "Zarcero", "Grecia", "Naranjo", 
                "Palmares", "Atenas", "Sarchí Norte", "Sarchí Sur", 
                "Valverde Vega", "San Ramón", "Carrillos", "La Fortuna"
            ],
            "Cartago": [
                "Cartago", "El Guarco", "La Unión", "Oreamuno", "Turrialba", 
                "Jiménez", "Paraíso", "Turrialba"
            ],
            "Heredia": [
                "Heredia", "Barva", "Santo Domingo", "Santa Bárbara", 
                "San Rafael", "San Isidro", "San Pablo", "Belén", "Flores", 
                "San Joaquín"
            ],
            "Guanacaste": [
                "Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", 
                "Cañas", "Tilarán"
            ],
            "Puntarenas": [
                "Puntarenas", "Esparza", "Buenos Aires", "Osa", "Golfito", 
                "Coto Brus", "Quepos", "Garabito", "Corredores"
            ],
            "Limón": [
                "Limón", "Guácimo", "Siquirres", "Talamanca", "Pococí", 
                "Matina", "Batán"
            ]
        }

        for provincia in provincias_cr:
            for canton_name in cantones_cr.get(provincia.province_name, []):
                provincia.cantons.append(Cantons(canton_name=canton_name))

        # Datos de El Salvador
        el_salvador = Countries(country_name="El Salvador")
        provincias_sv = [
            Provinces(province_name="Ahuachapán", country=el_salvador),
            Provinces(province_name="Santa Ana", country=el_salvador),
            Provinces(province_name="Sonsonate", country=el_salvador),
            Provinces(province_name="San Salvador", country=el_salvador),
            Provinces(province_name="La Libertad", country=el_salvador),
            Provinces(province_name="Cuscatlán", country=el_salvador),
            Provinces(province_name="La Paz", country=el_salvador),
            Provinces(province_name="Cabañas", country=el_salvador),
            Provinces(province_name="Chalatenango", country=el_salvador),
            Provinces(province_name="San Vicente", country=el_salvador),
            Provinces(province_name="Morazán", country=el_salvador),
            Provinces(province_name="Usulután", country=el_salvador),
            Provinces(province_name="San Miguel", country=el_salvador),
            Provinces(province_name="La Unión", country=el_salvador)
        ]

        # Cantones de El Salvador
        cantones_sv = {
            "Ahuachapán": [
                "Ahuachapán", "Apaneca", "Atiquizaya", "El Refugio", 
                "San Lorenzo", "San Francisco Menéndez", "Jujutla", 
                "San Pedro Puxtla", "San Miguel", "El Congo", "La Libertad", 
                "La Palma"
            ],
            "Santa Ana": [
                "Santa Ana", "Chalchuapa", "Coatepeque", "El Congo", 
                "Santa Rosa Guachipilín", "San Sebastián Salitrillo", "Masahuat", 
                "San Luis", "San Ignacio", "El Salvador del Mundo", "Santa Tecla", 
                "San Antonio"
            ],
            "Sonsonate": [
                "Sonsonate", "Acajutla", "Armenia", "Caluco", "Izalco", 
                "Juayúa", "Nahuizalco", "Salcoatitán", "San Antonio del Monte", 
                "San Julián", "Santa Isabel Ishuatán", "Santo Domingo de Guzmán"
            ],
            "San Salvador": [
                "San Salvador", "Antiguo Cuscatlán", "Ciudad Delgado", "Colón", 
                "El Paisnal", "Guadalupe", "Ilopango", "San Marcos", 
                "Santa Tecla", "Apopa", "Panchimalco", "Soyapango"
            ],
            "La Libertad": [
                "La Libertad", "Antiguo Cuscatlán", "Chiltiupán", "Comasagua", 
                "Colón", "San Juan Opico", "Tepecoyo", "Tamanique", 
                "San José Villanueva", "San Matías"
            ],
            "Cuscatlán": [
                "Cojutepeque", "El Rosario", "San Ramón", "San Pedro Perulapan", 
                "San Bartolo", "San Miguelito"
            ],
            "La Paz": [
                "La Paz", "Cuyultitán", "El Salvador del Mundo", 
                "San Pedro Nonualco", "San Juan Talpa", "San Antonio", 
                "San Luis Talpa"
            ],
            "Cabañas": [
                "Cabañas", "Cinquera", "César", "Ilobasco", "San Isidro", 
                "Sensuntepeque"
            ],
            "Chalatenango": [
                "Chalatenango", "Agua Caliente", "La Laguna", "La Palma", 
                "El Carrizal", "San Fernando", "San Francisco Lempa", 
                "San Miguel de Mercedes"
            ],
            "San Vicente": [
                "San Vicente", "San Sebastián", "San Cayetano", "Santa Clara", 
                "Guadalupe", "San Juan Nonualco"
            ],
            "Morazán": [
                "Morazán", "Arambala", "Corinto", "Guatajiagua", 
                "San Carlos", "San Fernando", "San Francisco Gotera", 
                "San Isidro"
            ],
            "Usulután": [
                "Usulután", "Alegría", "El Triunfo", "Jiquilisco", 
                "San Francisco Javier", "Santa Elena"
            ],
            "San Miguel": [
                "San Miguel", "Chinameca", "El Tránsito", "La Unión", 
                "San Jorge", "San Miguel"
            ],
            "La Unión": [
                "La Unión", "El Aguacate", "El Carmen", "Concepción de Oriente", 
                "La Unión"
            ]
        }

        for provincia in provincias_sv:
            for canton_name in cantones_sv.get(provincia.province_name, []):
                provincia.cantons.append(Cantons(canton_name=canton_name))

        # Inserta todos los datos en la base de datos
        session.add_all([costa_rica, el_salvador] + provincias_cr + provincias_sv)
        session.commit()
        
    return {"message": "Datos de países, provincias y cantones insertados exitosamente."}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function insertarDatosPaises() {
    const costaRica = await prisma.countries.create({
        data: {
            countryName: "Costa Rica",
            provinces: {
                create: [
                    { provinceName: "San José" },
                    { provinceName: "Alajuela" },
                    { provinceName: "Cartago" },
                    { provinceName: "Heredia" },
                    { provinceName: "Guanacaste" },
                    { provinceName: "Puntarenas" },
                    { provinceName: "Limón" },
                ]
            }
        },
        include: {
            provinces: true,  // Incluir las provincias relacionadas
          }
    });
    const cantonesCR = {
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
    };

    for (let provincia of costaRica.provinces) {
        const cantonNames = cantonesCR[provincia.provinceName] || [];
        for (let cantonName of cantonNames) {
            await prisma.cantons.create({
                data: {
                    cantonName: cantonName,
                    provinceId: provincia.id
                }
            });
        }
    }

    const elSalvador = await prisma.countries.create({
        data: {
            countryName: "El Salvador",
            provinces: {
                create: [
                    { provinceName: "Ahuachapán" },
                    { provinceName: "Santa Ana" },
                    { provinceName: "Sonsonate" },
                    { provinceName: "San Salvador" },
                    { provinceName: "La Libertad" },
                    { provinceName: "Cuscatlán" },
                    { provinceName: "La Paz" },
                    { provinceName: "Cabañas" },
                    { provinceName: "Chalatenango" },
                    { provinceName: "San Vicente" },
                    { provinceName: "Morazán" },
                    { provinceName: "Usulután" },
                    { provinceName: "San Miguel" },
                    { provinceName: "La Unión" }
                ]
            }
        },
        include: {
            provinces: true,  // Incluir las provincias relacionadas
          }
    });

    const cantonesSV = {
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
        // ... Add the other provinces and cantons of El Salvador here.
    };

    for (let provincia of elSalvador.provinces) {
        const cantonNames = cantonesSV[provincia.provinceName] || [];
        for (let cantonName of cantonNames) {
            await prisma.cantons.create({
                data: {
                    cantonName: cantonName,
                    provinceId: provincia.id
                }
            });
        }
    }

    return { message: "Datos de países, provincias y cantones insertados exitosamente." };
}

insertarDatosPaises()
    .then(result => console.log(result))
    .catch(err => console.error(err))
    .finally(() => prisma.$disconnect());

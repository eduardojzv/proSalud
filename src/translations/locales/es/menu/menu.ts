import { MenuStructure } from "../../../../helpers/interfaces/menu";

export const esMenu: MenuStructure = {
    items: {
        home: "Inicio",
        ourWork: "Nuestro Trabajo",
        ourBrands: "Nuestras Marcas",
        sustainability: "Sostenibilidad",
        workWithUs: "Trabaja con Nosotros",
        contactUs: "Contáctanos",
    },
    dropdownItems: {
        aboutUs: {
            text: "Lo que Somos",
            subLinks: {
                ourLocation: "Donde Estamos",
                CR: "Costa Rica",
                info: "Información"
            }
        }
    }
}
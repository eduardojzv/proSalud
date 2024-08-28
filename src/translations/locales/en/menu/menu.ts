import { MenuStructure } from "../../../../helpers/interfaces/menu";

export const enMenu: MenuStructure = {
    items: {
        home: "Home",
        ourWork: "Our Work",
        ourBrands: "Our Brands",
        sustainability: "Sustainability",
        workWithUs: "Work With Us",
        contactUs: "Contact Us",
    },
    dropdownItems: {
        aboutUs: {
            text: "About Us",
            subLinks: {
                ourLocation: "Our Location",
                CR: "Costa Rica",
                info: "Information"
            }
        },
    }
}

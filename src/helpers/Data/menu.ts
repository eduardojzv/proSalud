import { MenuDetails } from "../interfaces/menu"
export const menuItems: MenuDetails = {
    items: {
        home: {
            href: "/",
            state: true
        },
        ourWork: {
            href: "/our-work",
            state: false
        },
        ourBrands: {
            href: "/our-brands",
            state: true
        },
        sustainability: {
            href: "/sustainability",
            state: false
        },
        workWithUs: {
            href: "/work-with-us",
            state: true
        },
        contactUs: {
            href: "/contact-us",
            state: false
        },
    },
    dropdownItems: {
        aboutUs: {
            href: "#",
            subLinks: {
                ourLocation: {
                    href: "#",
                    state: false
                },
                CR: {
                    href: "#",
                    state: false
                },
                info: {
                    href: "#",
                    state: false
                }
            }
        },
    }
};
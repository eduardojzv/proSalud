import { MenuDetails } from "../interfaces/menu"
export const menuItems: MenuDetails = {
    items: {
        home: {
            href: "/"
        },
        ourWork: {
            href: "/our-work"
        },
        ourBrands: {
            href: "/our-brands"
        },
        sustainability: {
            href: "/sustainability"
        },
        workWithUs: {
            href: "/work-with-us"
        },
        contactUs: {
            href: "/contact-us"
        },
    },
    dropdownItems: {
        aboutUs: {
            href: "#",
            subLinks: {
                ourLocation: {
                    href: "#",
                },
                CR: {
                    href: "#",
                },
                info: {
                    href: "#",
                }
            }
        },
    }
}
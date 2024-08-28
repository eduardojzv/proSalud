export interface MenuStructure {
    items: {
        home: string,
        ourWork: string,
        ourBrands: string,
        sustainability: string,
        workWithUs: string,
        contactUs: string,
    },
    dropdownItems: {
        aboutUs: {
            text: string,
            subLinks: {
                ourLocation: string,
                CR: string,
                info: string
            }
        },
    }
}

interface MenuLink {
    href: string;
}

export type MenuDetailsItems = {
    [K in keyof MenuStructure['items']]: MenuLink;
};

export type MenuDetailsDropdownItems = {
    [K in keyof MenuStructure['dropdownItems']]: {
        href: string;
        subLinks: {
            [SubK in keyof MenuStructure['dropdownItems'][K]['subLinks']]: MenuLink;
        };
    };
};

export interface MenuDetails {
    items: MenuDetailsItems;
    dropdownItems: MenuDetailsDropdownItems;
}
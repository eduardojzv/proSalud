interface CarrouselStructure {
    img: string;
    element?: JSX.Element
    url?:string;
    descrip?:string
}
export interface DataHomeCarrousel {
    [key:string]: CarrouselStructure;
}

export interface TransHomeStructure {
    carrousel: {
        slide01: {
            text01: string;
            text02: string;
        };
        slide02: {
            text01: string;
        };
        slide03: {
            text01: string;
        };
        slide04: {
            text01: string;
        };
        slide05: {
            text01: string;
        };
    };
    certificaction: {
        title: string;
        text: string;
        moreInfo: string;
    };
    achievements: {
        countries: string;
        brands: string;
        jobs: string;
        certification: string;
    };
    Manufacturing: {
        title: string;
        text: string;
    };
    moreInfo: string;
    visit: string;
    brands: string;
}

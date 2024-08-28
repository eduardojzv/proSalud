interface SocialMediaLink {
  href: string;
  icon: JSX.Element;
}

export interface BrandInfo {
  img: string;
  officialPage?: string;
  social?: {
    facebook?: SocialMediaLink;
    instagram?: SocialMediaLink;
  };
}

export interface BrandStructure {
  sardimar: BrandInfo;
  tesoro: BrandInfo;
  splash: BrandInfo;
  tonnino: BrandInfo;
  aurora: BrandInfo;
  gaviota: BrandInfo;
  bluePacific: BrandInfo;
  pacificoAzul: BrandInfo;
  verdeMar: BrandInfo;
  norte: BrandInfo;
}
export interface TransBrandStructure {
  banner: {
    title: string;
    text: string;
  };
  brands: {
    title: string;
    visit: string;
  } & {
    [key in keyof BrandStructure]: { text: string };
  };
}

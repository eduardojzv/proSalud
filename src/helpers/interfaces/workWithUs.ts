export interface Options {
  id:string;
  value: string;
}
//
export interface Filters {
  locations: {
    country:string[],
    province:string[],
    canton:string[]
  };
  categories: string[];
  limit: number;
  offSet: number;
}

export interface Job {
  jobs: {
    id: number;
    vacancies: number;
    title: string;
    position: string;
    image_url: string;
    state: boolean;
    slug: string;
    department: string;
    professional_level: string;
    working_day: string;
    salary_min: number;
    salary_max: number;
    category: string;
    subcategory: string;
    sector: string;
    country: string;
    province: string;
    canton: string;
    requirements: string[];
  }[],
  totalJobs:number;
}
export interface Options {
  value: string;
}
// Define la interfaz para una categoría
interface Category {
  id: number;
  category: string;
}

interface Position {
  id: number;
  position: string;
}
export interface Filters {
  locations: string[];
  categories: string[];
  limit: string;
  offSet: string;
}
export interface Location {
  city: string,
  vacancies: number
}
export interface Jobe {
  jobs: {
    id: number;
    descriptions: string[];
    requirements: string[];
    salary: string;
    available: boolean;
    category: Category;
    position: Position;
    images: string[];
    locations: Location[];
    department: string;
  }[],
  totalJobs: number;
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
  //totalJobs:number;
}
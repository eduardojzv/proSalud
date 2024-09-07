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
}
export interface Location{
    city: string,
    vacancies: number
}
export interface Job {
  id: number;
  descriptions: string[];
  requirements: string[];
  salary: string;
  available: boolean;
  category: Category;
  position: Position;
  images: string[];  // Array of image URLs
  locations: Location[];  // Array of location names
  department:string;
}


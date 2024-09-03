export interface Options {
  value: string;
  label: string;
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

export interface Job {
  id: number;
  descriptions: string[];
  requirements: string[];
  salary: string;
  available: boolean;
  category: Category;
  position: Position;
  images: string[];  // Array of image URLs
  locations: string[];  // Array of location names
  department:string;
}


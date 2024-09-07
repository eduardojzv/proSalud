import { Job, Options } from "../../helpers/interfaces/workWithUs";
interface JobsData {
  limit: string;
  offset: string;
  categories: string[];
  locations: string[]
}
export const fetchJobsData = async ({limit,offset,categories,locations}: JobsData): Promise<Job[]> => {
  // Construir la URL con los parámetros
  const query = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    ...(categories.length > 0 && { categories: categories.join(',') }),
    ...(locations.length > 0 && { locations: locations.join(',') })
  });
  const response = await fetch(`http://127.0.0.1:8000/jobs/all-jobs?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
export const fetchLocationsData = async (): Promise<Options[]> => {
  const response = await fetch('http://127.0.0.1:8000/jobs/all-locations');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchPositionsData = async (): Promise<Options[]> => {
  const response = await fetch('http://127.0.0.1:8000/jobs/all-categories');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
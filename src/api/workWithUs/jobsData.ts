import { Filters, Job, Options } from "../../helpers/interfaces/workWithUs";
const URL_API:string =import.meta.env.VITE_API_BACKEND || "http://127.0.0.1:8000"
export const fetchJobsData = async ({ limit, offSet,
  //categories,
  locations }: Filters): Promise<Job> => {
  // Construir la URL con los parámetros
  const query = new URLSearchParams({
    limit: limit.toString(),
    offset: (offSet * limit).toString(),
    //...(categories.length > 0 && { categories: categories.join(',') }),
    ...(locations.country && { country: locations.country }),
    //...(locations.province && { province: locations.province }),
    //...(locations.canton && { canton: locations.canton }),
  });
  const response = await fetch(`${URL_API}/jobs/get-all-jobs?${query.toString()}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json(); // Obtén la respuesta completa como JSON
  return {
    jobs: data.jobs,
    totalJobs: data.totalJobs
  };
};

export const fetchContriessData = async (): Promise<Options[]> => {
  const response = await fetch(`${URL_API}/location/get-countries`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json()
  return data.countries;
};

export const fetchPositionsData = async (): Promise<Options[]> => {
  const response = await fetch(`${URL_API}/jobs/all-categories`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
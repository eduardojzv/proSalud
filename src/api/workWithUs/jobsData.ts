import { Filters, Job, Options } from "../../helpers/interfaces/workWithUs";
export const fetchJobsData = async ({ limit, offSet, categories, locations }: Filters): Promise<Job> => {
  // Construir la URL con los parámetros
  const query = new URLSearchParams({
    limit: limit,
    offset: ((parseInt(offSet))*parseInt(limit)).toString(),
    ...(categories.length > 0 && { categories: categories.join(',') }),
    ...(locations.length > 0 && { locations: locations.join(',') })
  });
  console.log("query",query.toString());
  //arreglar offSet
  
  const response = await fetch(`http://127.0.0.1:8000/jobs/all-jobs?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json(); // Obtén la respuesta completa como JSON
  return {
    jobs:data.jobs,
    totalJobs:data.totalJobs
  };
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
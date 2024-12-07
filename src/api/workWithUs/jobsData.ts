import { Filters, Job, Options } from "../../helpers/interfaces/workWithUs";
const URL_API:string =import.meta.env.VITE_API_BACKEND
console.log("URL_API",URL_API);
export const fetchJobsData = async ({ limit, offSet,locations }: Filters): Promise<Job> => {
  // Construir la URL con los parámetros
  const query=new URLSearchParams()
  //basic params
  query.set('limit',limit.toString())
  query.set("offset", (offSet * limit).toString())
  if (locations && typeof locations === "object") {
    Object.entries(locations).forEach(([key, val]) => {
      if (val.length>0 ) {
        val.forEach((v) => query.append(key, v));
      }
    });
  }
  console.log("query",query.toString());
  
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
import { Job } from "../../helpers/interfaces/workWithUs";

export const fetchJobsData = async (): Promise<Job[]> => {
    const response = await fetch('http://127.0.0.1:8000/jobs/all-jobs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Devuelve la promesa que resuelve con los datos de tipo Job[]
  };
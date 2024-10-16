import { create } from 'zustand'
import { Filters, Job } from '../helpers/interfaces/workWithUs';
import { fetchJobsData } from '../api/workWithUs/jobsData';

interface JobStore {
    jobs: Job['jobs'];
    filters: Filters;
    setJobs:(filters:Partial<Filters>) => void;
    jobOffers: {
        offers: number;
        vacancies: number;
    };
    setJobOffers: (location: Job['jobs']) => void;
    setFilters: (newFilters: Partial<Filters>) => void;
    totalJobs:number;
}
export const useJobStore = create<JobStore>((set, get) => ({
    jobs: [],
    totalJobs:0,
    filters: {
        locations: [],
        categories: [],
        limit: '',
        offSet: '',
    },
    jobOffers: {
        offers: 0,
        vacancies: 0,
    },
    setJobOffers: (jobs) => {
        set(() => {
            // Calcula el total de vacantes sumando las vacantes de todas las ubicaciones de cada trabajo
            const totalVacancies = jobs.reduce((acc, job) => {
                // Suma todas las vacantes de las ubicaciones del trabajo actual
                const jobVacancies = job.locations.reduce((sum, location) => sum + location.vacancies, 0);
                return acc + jobVacancies;
            }, 0);
            return {
                jobOffers: {
                    offers: jobs.length, // Total de ofertas basado en la longitud de Jobs
                    vacancies: totalVacancies, // Total de vacantes disponibles
                },
            };
        });
    },
    setFilters: (newFilters: Partial<Filters>) => {
        set((state) => {
            const updatedFilters = { ...state.filters, ...newFilters };
            return {filters: updatedFilters};
        });
    },
    setJobs: async (filters) => {       
        const currentFilters = get().filters;
        const data = await fetchJobsData({...currentFilters,...filters})
        set((state) => {
            state.setJobOffers(data.jobs)
            return { jobs: data.jobs,totalJobs:data.totalJobs };
        })
    },
}));

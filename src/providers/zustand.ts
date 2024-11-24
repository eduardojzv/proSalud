import { create } from 'zustand'
import { Filters, Job } from '../helpers/interfaces/workWithUs';
import { fetchJobsData } from '../api/workWithUs/jobsData';

interface JobStore {
    jobs: Job['jobs'];
    filters: Filters;
    setJobs: (filters: Partial<Filters>) => void;
    jobOffers: {
        offers: number;
        vacancies: number;
    };
    setJobOffers: (location: Job['jobs']) => void;
    setFilters: (newFilters: Partial<Filters>) => void;
    totalJobs: number;
}
export const useJobStore = create<JobStore>((set, get) => ({
    jobs: [],
    totalJobs: 0,
    filters: {
        locations: {
            country:'',
            province:'',
            canton:''
        },
        categories: [],
        limit: 5,
        offSet: 0,
    },
    jobOffers: {
        offers: 0,
        vacancies: 0,
    },
    setJobOffers: (jobs) => {
        set(() => {
            const totalVacancies = jobs.reduce((acc, job) => {
                return acc + job.vacancies;
            }, 0);

            return {
                jobOffers: {
                    offers: jobs.length,
                    vacancies: totalVacancies,
                },
            };
        });
    },
    setFilters: (newFilters: Partial<Filters>) => {
        set((state) => {
            const updatedFilters = { ...state.filters, ...newFilters };
            return { filters: updatedFilters };
        });
    },
    setJobs: async (filters) => {
        const currentFilters = get().filters;
        const data = await fetchJobsData({ ...currentFilters, ...filters })
        set((state) => {
            state.setJobOffers(data.jobs)
            return { jobs: data.jobs,totalJobs:data.totalJobs };
        })
    },
}));

import { create } from 'zustand'
import { Filters, Job } from '../helpers/interfaces/workWithUs';

interface JobStore {
    jobs: Job[];
    jobsCopy: Job[];
    filters: Filters;
    setFilters: (newFilters: Partial<Filters>) => void;
    setJobs: (jobs: Job[]) => void;
    jobOffers: {
        offers: number;
        vacancies: number;
    }
    setJobOffers:(location:Job[]) => void;
}
export const useJobStore = create<JobStore>((set) => ({
    // limit:0
    jobs: [],
    jobsCopy: [],
    filters: {
        locations: [],
        categories: [],
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
            const filteredJobs = filterJobsBasedOnFilters(state.jobsCopy, updatedFilters);
            state.setJobOffers(filteredJobs)
            return {
                filters: updatedFilters,
                jobs: filteredJobs,
            };
        });
    },
    setJobs: (jobs) => set((state) => {
        const updatedState = { jobs, jobsCopy: jobs };
        if (state.filters.locations.length > 0 || state.filters.categories.length > 0) {
            updatedState.jobs = filterJobsBasedOnFilters(state.jobs, state.filters);
        }
        state.setJobOffers(updatedState.jobs)
        return updatedState;
    }),
    // setLimit: (limit) => {
    //     set((state) => {
    //          return { ...state, limit };
    //     });
    // },
}));
function filterJobsBasedOnFilters(jobs: Job[], filters: Filters): Job[] {
    return jobs.filter((job) =>
        (filters.locations.length === 0 || job.locations.some(loc => filters.locations.includes(loc.city))) &&
        (filters.categories.length === 0 || filters.categories.includes(job.category.category))
    );
}

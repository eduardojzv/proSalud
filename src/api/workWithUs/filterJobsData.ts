type Job = {
    id: number;
    vacancies: number;
    title: string | null;
    position: string | null;
    image_url: string | null;
    state: boolean;
    slug: string;
    department: string | null;
    professional_level: string | null;
    working_day: string;
    salary_min: number;
    salary_max: number;
    category: string | null;
    subcategory: string | null;
    sector: string | null;
    country: string | null;
    province: string | null;
    canton: string | null;
    requirements: string[];
};

type QueryParams = {
    limit?: number;
    offset?: number;
    categories?: string;
    country?: string[];
    province?: string;
    canton?: string;
};

export function filterJobs(data: Job[], params: QueryParams) {
    const {
        limit = 5,
        offset = 0,
        categories,
        country,
        province,
        canton,
    } = params;

    try {
        // Aplicar filtros dinámicos
        let filteredJobs = [...data];

        if (categories) {
            const categoryList = categories.split(",");
            filteredJobs = filteredJobs.filter(job => categoryList.includes(job.category || ""));
        }

        if (country) {
            filteredJobs = filteredJobs.filter(job => country.includes(job.country || ""));
        }

        if (province) {
            filteredJobs = filteredJobs.filter(job => job.province === province);
        }

        if (canton) {
            filteredJobs = filteredJobs.filter(job => job.canton === canton);
        }

        // Calcular total de trabajos después de aplicar filtros
        const totalJobs = filteredJobs.length;

        // Aplicar paginación
        const paginatedJobs = filteredJobs.slice(offset, offset + limit);

        // Formatear datos para la respuesta
        const result = paginatedJobs.map(job => ({
            id: job.id,
            vacancies: job.vacancies,
            title: job.title,
            position: job.position,
            image_url: job.image_url,
            state: job.state,
            slug: job.slug,
            department: job.department,
            professional_level: job.professional_level,
            working_day: job.working_day,
            salary_min: job.salary_min,
            salary_max: job.salary_max,
            category: job.category,
            subcategory: job.subcategory,
            sector: job.sector,
            country: job.country,
            province: job.province,
            canton: job.canton,
            requirements: job.requirements,
        }));

        return { jobs: result, totalJobs };
    } catch (error) {
        console.error("Error:", error);
        return { error: String(error) };
    }
}

// Ejemplo de uso
const mockJobs: Job[] = [
    {
        id: 1,
        vacancies: 3,
        title: "Software Engineer",
        position: "Engineer",
        image_url: "image1.jpg",
        state: true,
        slug: "job-slug-1",
        department: "IT",
        professional_level: "Senior",
        working_day: "Full-time",
        salary_min: 30000,
        salary_max: 50000,
        category: "Technology",
        subcategory: "Development",
        sector: "Tech",
        country: "USA",
        province: "California",
        canton: "San Francisco",
        requirements: ["JavaScript", "React"],
    },
];

// const queryParams: QueryParams = {
//     limit: 5,
//     offset: 0,
//     categories: "Technology",
//     country: ["USA"],
//     province: "California",
// };

// const response = getJobs(mockJobs, queryParams);
// console.log(response);

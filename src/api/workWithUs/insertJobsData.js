import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';
const prisma = new PrismaClient();

// Función para insertar datos de prueba en la base de datos
async function insertarDatosDePrueba({
    n_jobs,
    n_departments,
    n_levels,
    n_titles,
    n_categories,
    n_subcategories,
    n_sectors,
    n_requirements,
    n_descriptions,
    n_skills,
    n_positions,
    n_competencies
}) {
    try {
        // Insertar datos en Competencies
        for (let i = 1; i <= n_competencies; i++) {
            await prisma.competencies.create({
                data: { competence: `competence${i}` }
            });
        }

        // Insertar datos en Positions
        for (let i = 1; i <= n_positions; i++) {
            await prisma.positions.create({
                data: { positionName: `position${i}` }
            });
        }

        // Insertar datos en Departments
        for (let i = 1; i <= n_departments; i++) {
            await prisma.departments.create({
                data: { departmentName: `department${i}` }
            });
        }

        // Insertar datos en ProfessionalLevels
        for (let i = 1; i <= n_levels; i++) {
            await prisma.professionalLevels.create({
                data: { levelName: `level${i}` }
            });
        }

        // Insertar datos en Titles
        for (let i = 1; i <= n_titles; i++) {
            await prisma.titles.create({
                data: { title: `title${i}` }
            });
        }

        // Insertar datos en Categories
        for (let i = 1; i <= n_categories; i++) {
            await prisma.categories.create({
                data: { categoryName: `category${i}` }
            });
        }

        // Insertar datos en Subcategories
        const categories = await prisma.categories.findMany();
        for (let i = 1; i <= n_subcategories; i++) {
            await prisma.subcategories.create({
                data: {
                    subcategoryName: `subcategory${i}`,
                    categoryId: categories[Math.floor(Math.random() * categories.length)].id
                }
            });
        }

        // Insertar datos en Sectors
        for (let i = 1; i <= n_sectors; i++) {
            await prisma.sectors.create({
                data: { sectorName: `sector${i}` }
            });
        }

        // Insertar datos en Requirements
        for (let i = 1; i <= n_requirements; i++) {
            await prisma.requirements.create({
                data: { requirement: `requirement${i}` }
            });
        }

        // Insertar datos en Descriptions
        for (let i = 1; i <= n_descriptions; i++) {
            await prisma.descriptions.create({
                data: { description: `description${i}` }
            });
        }

        // Insertar datos en Skills
        for (let i = 1; i <= n_skills; i++) {
            await prisma.skills.create({
                data: { skillName: `skill${i}` }
            });
        }

        // Insertar datos en Images
        const images = [
            { imageUrl: "/listImg.jpg" },
            { imageUrl: "/flequeador.jpg" }
        ];
        await prisma.images.createMany({
            data: images
        });

        // Insertar datos en Jobs
        const departments = await prisma.departments.findMany();
        const levels = await prisma.professionalLevels.findMany();
        const titles = await prisma.titles.findMany();
        const subcategories = await prisma.subcategories.findMany();
        const sectors = await prisma.sectors.findMany();
        const descriptions = await prisma.descriptions.findMany();
        const requirements = await prisma.requirements.findMany();
        const skills = await prisma.skills.findMany();
        const positions = await prisma.positions.findMany();
        const competencies = await prisma.competencies.findMany();
        const imagesData = await prisma.images.findMany();
        const cantons = await prisma.cantons.findMany({
            include: {
                province: {
                    include: {
                        country: true
                    }
                }
            }
        });
        const test=imagesData[Math.floor(Math.random() * imagesData.length)].id
        for (let i = 1; i <= n_jobs; i++) {
            const canton = cantons[Math.floor(Math.random() * cantons.length)];
            const job = await prisma.jobs.create({
                data: {
                    vacancies: Math.floor(Math.random() * 10) + 1,
                    state: Math.random() > 0.5,
                    slug: `job-slug-${i}`,
                    workingDay: `working_day${i}`,
                    salaryMin: Math.floor(Math.random() * 30000) + 20000,
                    salaryMax: Math.floor(Math.random() * 50000) + 50001,
                    //connect
                    listImage: { connect: { id: imagesData[Math.floor(Math.random() * imagesData.length)].id } },
                    presentationImg: { connect: { id: imagesData[Math.floor(Math.random() * imagesData.length)].id } },
                    country: { connect: { id: canton.province.countryId } },
                    province: { connect: { id: canton.provinceId } },
                    canton: { connect: { id: canton.id } },
                    sector: { connect: { id: sectors[Math.floor(Math.random() * sectors.length)].id } },
                    category: { connect: { id: categories[Math.floor(Math.random() * categories.length)].id } },
                    subcategory: { connect: { id: subcategories[Math.floor(Math.random() * subcategories.length)].id } },
                    professionalLevel: { connect: { id: levels[Math.floor(Math.random() * levels.length)].id } },
                    department: { connect: { id: departments[Math.floor(Math.random() * departments.length)].id } },
                    position: { connect: { id: positions[Math.floor(Math.random() * positions.length)].id } },
                    title: { connect: { id: titles[Math.floor(Math.random() * titles.length)].id } },
                },
            });

            // Generar relaciones aleatorias para JobDescriptions
            const randomDescriptions = [];
            for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
                const descriptionId = descriptions[Math.floor(Math.random() * descriptions.length)].id;
                if (!randomDescriptions.includes(descriptionId)) {
                    randomDescriptions.push(descriptionId);
                }
            }
            await prisma.jobDescriptions.createMany({
                data: randomDescriptions.map((descriptionId) => ({
                    jobId: job.id,
                    descriptionId,
                })),
            });

            // Generar relaciones aleatorias para JobRequirements
            const randomRequirements = [];
            for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
                const requirementId = requirements[Math.floor(Math.random() * requirements.length)].id;
                if (!randomRequirements.includes(requirementId)) {
                    randomRequirements.push(requirementId);
                }
            }
            await prisma.jobRequirements.createMany({
                data: randomRequirements.map((requirementId) => ({
                    jobId: job.id,
                    requirementId,
                })),
            });

            // Generar relaciones aleatorias para JobSkills
            const randomSkills = [];
            for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
                const skillId = skills[Math.floor(Math.random() * skills.length)].id;
                if (!randomSkills.includes(skillId)) {
                    randomSkills.push(skillId);
                }
            }
            await prisma.jobSkills.createMany({
                data: randomSkills.map((skillId) => ({
                    jobId: job.id,
                    skillId,
                })),
            });

            // Generar relaciones aleatorias para JobCompetencies
            const randomCompetencies = [];
            for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
                const competencyId = competencies[Math.floor(Math.random() * competencies.length)].id;
                if (!randomCompetencies.includes(competencyId)) {
                    randomCompetencies.push(competencyId);
                }
            }
            await prisma.jobCompetencies.createMany({
                data: randomCompetencies.map((competencyId) => ({
                    jobId: job.id,
                    competencyId,
                })),
            });
        }



        return { message: "Datos de prueba insertados exitosamente" };
    } catch (error) {
        console.error("Error:", error);
        return { error: error.message };
    }
}

// Ejemplo de uso:
(async () => {
    try {
        const params = {
            n_jobs: 5,
            n_departments: 3,
            n_levels: 2,
            n_titles: 3,
            n_categories: 2,
            n_subcategories: 2,
            n_sectors: 2,
            n_requirements: 5,
            n_descriptions: 3,
            n_skills: 4,
            n_positions: 3,
            n_competencies: 2
        };

        const result = await insertarDatosDePrueba(params);
        console.log(result);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
})();





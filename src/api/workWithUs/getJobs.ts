import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getJobs() {
    try {
        const jobs = await prisma.jobs.findMany({
            include: {
                title: true,
                position: true,
                listImage: true,
                presentationImg: true,
                department: true,
                professionalLevel: true,
                category: true,
                subcategory: true,
                sector: true,
                country: true,
                province: true,
                canton: true,
                jobRequirements: {
                    include: {
                        requirement: true
                    }
                },
                jobSkills: {
                    include: {
                        skill: true
                    }
                },
                jobCompetencies: {
                    include: {
                        competency: true
                    }
                }
            }
        });

        return jobs;
    } catch (error) {
        console.error("Error fetching jobs from Prisma:", error);
        throw new Error("Error fetching jobs.");
    }
}
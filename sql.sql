create database ProSalud;
use ProSalud;
select * from jobs;

select j.list_image_id,j.presentation_img_id,img.image_url,img.image_url presentation_img from jobs j left join images img on j.list_image_id=img.id;

select * from images;

SELECT
    jobs.id AS job_id,
    jobs.vacancies,
    images_list.image_url AS list_image_url,
    images_presentation.image_url AS presentation_image_url,
    titles.title AS job_title,
    positions.position_name AS position_name,
    jobs.state,
    jobs.slug,
    departments.department_name,
    professional_levels.level_name AS professional_level,
    jobs.working_day,
    jobs.salary_min,
    jobs.salary_max,
    categories.category_name,
    subcategories.subcategory_name,
    sectors.sector_name,
    countries.country_name,
    provinces.province_name,
    cantons.canton_name,
    GROUP_CONCAT(DISTINCT descriptions.description) AS descriptions,
    GROUP_CONCAT(DISTINCT requirements.requirement) AS requirements,
    GROUP_CONCAT(DISTINCT skills.skill_name) AS skills
FROM jobs
-- Relaciones con imágenes
LEFT JOIN images AS images_list ON jobs.list_image_id = images_list.id
LEFT JOIN images AS images_presentation ON jobs.presentation_img_id = images_presentation.id
-- Relaciones con títulos, posiciones y departamentos
LEFT JOIN titles ON jobs.title_id = titles.id
LEFT JOIN positions ON jobs.position_id = positions.id
LEFT JOIN departments ON jobs.department_id = departments.id
-- Relación con niveles profesionales
LEFT JOIN professional_levels ON jobs.professional_level_id = professional_levels.id
-- Relaciones con categorías y subcategorías
LEFT JOIN categories ON jobs.category_id = categories.id
LEFT JOIN subcategories ON jobs.subcategory_id = subcategories.id
-- Relación con sectores
LEFT JOIN sectors ON jobs.sector_id = sectors.id
-- Relaciones con ubicaciones (países, provincias, cantones)
LEFT JOIN countries ON jobs.country_id = countries.id
LEFT JOIN provinces ON jobs.province_id = provinces.id
LEFT JOIN cantons ON jobs.canton_id = cantons.id
-- Relaciones muchos a muchos (descripciones, requisitos, habilidades)
LEFT JOIN job_descriptions ON jobs.id = job_descriptions.job_id
LEFT JOIN descriptions ON job_descriptions.description_id = descriptions.id
LEFT JOIN job_requirements ON jobs.id = job_requirements.job_id
LEFT JOIN requirements ON job_requirements.requirement_id = requirements.id
LEFT JOIN job_skills ON jobs.id = job_skills.job_id
LEFT JOIN skills ON job_skills.skill_id = skills.id
GROUP BY
    jobs.id,
    images_list.image_url,
    images_presentation.image_url,
    titles.title,
    positions.position_name,
    jobs.state,
    jobs.slug,
    departments.department_name,
    professional_levels.level_name,
    jobs.working_day,
    jobs.salary_min,
    jobs.salary_max,
    categories.category_name,
    subcategories.subcategory_name,
    sectors.sector_name,
    countries.country_name,
    provinces.province_name,
    cantons.canton_name;
/*Query list jobs*/
use ProSalud;
select distinct
	jobs.id AS job_id,
    jobs.vacancies,
    images_list.image_url AS list_image_url,
    titles.title,
    positions.position_name,
    categories.category_name,
    GROUP_CONCAT(DISTINCT requirements.requirement) AS requirements,
	countries.country_name,
    provinces.province_name,
    cantons.canton_name
    from jobs
-- Relaciones con imágenes
LEFT JOIN images AS images_list ON jobs.list_image_id = images_list.id
-- relacion titles
LEFT JOIN titles ON titles.id=jobs.title_id
-- relacion position
LEFT JOIN positions ON titles.id=jobs.title_id
-- relacion category
LEFT JOIN categories ON jobs.category_id = categories.id
-- relacion requirements
LEFT JOIN requirements ON job_requirements.requirement_id = requirements.id
-- Relaciones con ubicaciones (países, provincias, cantones)
LEFT JOIN countries ON jobs.country_id = countries.id
LEFT JOIN provinces ON jobs.province_id = provinces.id
LEFT JOIN cantons ON jobs.canton_id = cantons.id;


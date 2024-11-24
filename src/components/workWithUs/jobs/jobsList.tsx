import styles from './jobsList.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useJobStore } from '../../../providers/zustand';
import { Filters } from '../../../helpers/interfaces/workWithUs';
export default function JobList() {
  const [searchParams] = useSearchParams();
  const { jobs, setJobs, setFilters } = useJobStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const filters: Partial<Filters> = {
    offSet: (parseInt(searchParams.get('page') || '1') - 1),
    categories: searchParams.get('categories')?.split(',') || [],
    locations: {
      country: searchParams.get('country') || '',
      province: searchParams.get('province') || '',
      canton: searchParams.get('canton') || '',
    },
  };
  useEffect(() => {
    setFilters(filters)
    const jobsData = () => {
      try {
        setJobs(filters);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    jobsData();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (jobs.length === 0) {
    return <div className={styles.job__no__data}>No hay datos disponibles</div>
  }
  return (
    <div className={styles.cardGrid}>
      {jobs.map(job => (
        <div key={job.id} className={styles.card}>
          <div className={styles.card__imgContainer}>
            <img
              src={job.image_url}
              alt={`IMG:${job.title}`}
              className={styles.card__image}
            />

          </div>
          <div className={styles.card__content}>
            <h2 className={styles.card__title}>{job.title}</h2>
            <p className={styles.card__info}><strong>Posición:</strong> {job.position}</p>
            <p className={styles.card__info}><strong>Departamento:</strong> {job.department}</p>
            <p className={styles.card__info}><strong>Nivel Profesional:</strong> {job.professional_level}</p>
            <p className={styles.card__info}><strong>Jornada:</strong> {job.working_day}</p>
            <p className={styles.card__info}><strong>Salario:</strong> ₡{job.salary_min.toLocaleString()} - ₡{job.salary_max.toLocaleString()}</p>
            <p className={styles.card__info}><strong>Ubicación:</strong> {job.canton}, {job.province}, {job.country}</p>
            <p className={styles.card__info}><strong>Categoria:</strong> {job.category}</p>
            <p className={styles.card__info}><strong>Sub-Categoria:</strong> {job.subcategory}</p>
            <p className={styles.card__info}><strong>Departamento:</strong> {job.department}</p>
            <p className={styles.card__info}><strong>Nivel Profesional:</strong> {job.professional_level}</p>
            <p className={styles.card__info}><strong>Sector:</strong> {job.sector}</p>
            {/* <p className={styles.card__info}><strong>Requisitos:</strong></p>
            <ul className={styles.card__requirements}>
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul> */}
          </div>
          <div className={styles.card__footer}>
            <p className={styles.card__vacancybadge}>
              Vacantes: <strong>{job.vacancies}</strong>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
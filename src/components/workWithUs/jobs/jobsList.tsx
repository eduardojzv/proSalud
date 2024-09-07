import styles from './jobsList.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchJobsData } from '../../../api/workWithUs/jobsData';
import { useJobStore } from '../../../providers/zustand';
import { Job } from '../../../helpers/interfaces/workWithUs';

export default function JobList() {
  const [searchParams] = useSearchParams();
  const { jobs, setJobs, filters } = useJobStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Obtener los valores de los parámetros de búsqueda
  //ya esta funcionando con limit-------------------------
  //XX no actualiza cuando cambio de valores
  //falta agregar locations y categories al query string
  const limit = searchParams.get('limit') || '5'; // Valor por defecto de 5 si no está en la URL
  const offset = searchParams.get('offset') || '0'; // Valor por defecto de 0 si no está en la URL
  const categories = searchParams.get('categories')?.split(',') || []; // Convertir a array
  const locations = searchParams.get('locations')?.split(',') || []; // Convertir a array
  useEffect(() => {
    const jobsData = async () => {
      try {
        const data = await fetchJobsData({ limit, offset, categories, locations });
        console.log("data", data);

        setJobs(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    jobsData();
  }, [setJobs]);
  const isProductVisible = (job: Job) => {
    console.log(jobs);

    return (filters.locations.length === 0 || job.locations.some(loc => filters.locations.includes(loc.city))) &&
      (filters.categories.length === 0 || filters.categories.includes(job.category.category));

  }
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
    <div className={styles.jobList}>
      {jobs.map((job, idx) => (
        <div key={job.id} className={`${styles.jobCard} ${isProductVisible(job) ? styles.job__visible : styles.job__hidden} `}>
          <div className={styles.jobHeader}>
            <div className={styles.jobLogo}>
              <img
                alt={`logo`}
                src={job.images[0]}
              />
            </div>
            <div className={styles.jobInfo}>
              <div className={styles.jobCategory}>{job.category.category}</div>
              <h3 className={styles.jobTitle}>{job.position.position}</h3>
              <div className={styles.jobLocation}>{job.locations.map(location => location.city).join('-')}</div>
              <div className={styles.jobType}>{job.department}-{idx + 1}</div>
            </div>
          </div>
          <div className={styles.jobDetails}>
            <h4>Descripción:</h4>
            <ul className={styles.job__requirements}>
              {job.descriptions.map((description) => (
                <li key={description}>{description}</li>
              ))}
            </ul>
            <h4>Requisitos:</h4>
            <ul className={styles.job__requirements}>
              {job.requirements.map((require) => (
                <li key={require}>{require}</li>
              ))}
            </ul>
            <h4>Salario:</h4>
            <p>{job.salary}</p>
          </div>
          <div className={styles.job__footer}>
            <Link to={"#"} className={styles.job__link}>Visitar</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
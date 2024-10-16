import styles from './jobsList.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useJobStore } from '../../../providers/zustand';
import { Filters} from '../../../helpers/interfaces/workWithUs';

export default function JobList() {
  const [searchParams] = useSearchParams();
  const { jobs, setJobs,setFilters} = useJobStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const filters:Filters = {
    limit: searchParams.get('limit') || '5',
    offSet:  (parseInt(searchParams.get('page') || '1') - 1).toString(),
    categories: searchParams.get('categories')?.split(',') || [],
    locations: searchParams.get('locations')?.split(',') || []
  }
  useEffect(() => {
    console.log("shi pa");
    
    setFilters(filters)
    const jobsData =() => {
      try {
        setJobs(filters);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    jobsData();
  }, [setFilters]);

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
      {jobs.map((job) => (
        <div key={job.id} className={`${styles.jobCard}`}>
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
              <div className={styles.jobType}>{job.department}-{job.id}</div>
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
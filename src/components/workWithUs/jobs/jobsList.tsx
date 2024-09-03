import styles from './jobsList.module.css';
import { Job } from '../../../helpers/interfaces/workWithUs';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchJobsData } from '../../../api/workWithUs/jobsData';
// console.log("json data",jsonData);

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const jobsData = async () => {
      try {
        const data = await fetchJobsData();
        console.log("data",data);
        
        setJobs(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    jobsData(); // Llama a la función jobsData
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={styles.jobList}>
      {jobs.map((job) => (
        <div key={job.id} className={styles.jobCard}>
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
              <div className={styles.jobLocation}>{job.locations[0]}</div>
              <div className={styles.jobType}>{job.department}</div>
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
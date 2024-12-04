import styles from './jobsList.module.css';
import { useJobStore } from '../../../providers/zustand';

export default function JobList() {
  const { jobs} = useJobStore();
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
            <h2 className={styles.card__title}>{job.id}--{job.title}</h2>
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

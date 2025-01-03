import { TFunction } from "i18next";
import Filter from "./filter";
import styles from "./jobs.module.css"
import { Trans } from "react-i18next";
import JobList from "./jobsList";
import { useJobStore } from "../../../providers/zustand";
import { Pagination } from "../../others/pagination/pagination";
import { limits } from "../../../helpers/jobList/limits";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Filters } from "../../../helpers/interfaces/workWithUs";
import Loading from "../../others/loading/loading";
const { jobs__container, jobs__info, jobs__filter, jobs__list } = styles
interface Props {
  t: TFunction<"workWithUs">
}
export default function Jobs({ t }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setJobs, setFilters, jobOffers, jobs } = useJobStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // Función para validar y ajustar el parámetro `limit`
  function validateAndSetLimit() {
    let urlLimit = parseInt(searchParams.get('limit') || '');
    if (isNaN(urlLimit) || !limits.includes(urlLimit)) {
      urlLimit = limits[0]; // Valor predeterminado
      searchParams.set('limit', urlLimit.toString()); // Actualizar en la URL
      setSearchParams(searchParams);
    }
    return urlLimit;
  }
  function setDefaultPage() {
    searchParams.set('page', "1");
    setSearchParams(searchParams);
    return 0
  }
  // Función para generar los filtros
  const generateFilters = (): Partial<Filters> => ({
    limit: validateAndSetLimit(),
    offSet: setDefaultPage(),
    categories: searchParams.get('categories')?.split(',') || [],
    locations: {
      country: searchParams.getAll('country') || '',
      province: searchParams.getAll('province') || '',
      canton: searchParams.getAll('canton') || '',
    },
  });
  //fetch inicial de jobs
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const filters = generateFilters();
        setFilters(filters); // Actualiza los filtros en el store
        setJobs(filters); // Fetch de los trabajos basado en los filtros
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  //
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={jobs__container}>
      <section className={jobs__info}>
        <Trans t={t} i18nKey={'offers.descrip'} values={{ offers: jobOffers.offers, vacancies: jobOffers.vacancies }}>
          {t('offers.descrip')}
        </Trans>
      </section>
      <section className={jobs__filter}>
        <Filter />
      </section>
      <section className={jobs__list}>
        {
          jobs.length > 0 ?
            <>
              <JobList />
              <Pagination />
            </>
            : <div className={styles.job__no__data}>No hay datos disponibles</div>
        }

      </section>
    </div>
  )
}
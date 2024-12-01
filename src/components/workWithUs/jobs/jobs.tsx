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
const { jobs__container, jobs__info, jobs__filter, jobs__list } = styles
interface Props {
  t: TFunction<"workWithUs">
}
export default function Jobs({ t }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobs, setJobs, setFilters, totalJobs, filters, jobOffers } = useJobStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const totalPages = Math.ceil(totalJobs / filters.limit);
  //
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
  function validateAndSetPage() {
    let urlPage: number = parseInt(searchParams.get('page') || '');
    if (isNaN(urlPage) || urlPage < 1 || urlPage > totalPages) {
      urlPage = 1; // Página predeterminada
      searchParams.set('page', urlPage.toString());
      setSearchParams(searchParams);
    }
    return urlPage - 1
  }
  // Función para generar los filtros
  const generateFilters = (): Partial<Filters> => ({
    limit: validateAndSetLimit(),
    offSet: validateAndSetPage(),
    categories: searchParams.get('categories')?.split(',') || [],
    locations: {
      country: searchParams.get('country') || '',
      province: searchParams.get('province') || '',
      canton: searchParams.get('canton') || '',
    },
  });

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
  }, [searchParams]);
  //
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (jobs.length <= 0) {
    return <div className={styles.job__no__data}>No hay datos disponibles</div>;
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
        <JobList />
        <Pagination />
      </section>
    </div>
  )
}
import { TFunction } from "i18next";
import Filter from "./filter";
import styles from "./jobs.module.css"
import { Trans } from "react-i18next";
import JobList from "./jobsList";
import { useJobStore } from "../../../providers/zustand";
import { Pagination } from "../../others/pagination/pagination";
const { jobs__container, jobs__info, jobs__filter, jobs__list } = styles
interface Props {
  t: TFunction<"workWithUs">
}
export default function Jobs({ t }: Props) {
  const { jobOffers} = useJobStore();
  return (
    <div className={jobs__container}>
      <section className={jobs__info}>
        <Trans t={t} i18nKey={'offers.descrip'} values={{ offers: jobOffers.offers, vacancies: jobOffers.vacancies }}>
          {t('offers.descrip')}
        </Trans>
      </section>
      <section className={jobs__filter}>
        {/* <Filter /> */}
      </section>
      <section className={jobs__list}>
        <JobList />
        {/* <Pagination /> */}
      </section>
    </div>
  )
}
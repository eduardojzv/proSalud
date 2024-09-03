import { TFunction } from "i18next";
import Filter from "./filter";
import styles from "./jobs.module.css"
import { Trans } from "react-i18next";
import JobList from "./jobsList";
const { jobs, jobs__info, jobs__filter,jobs__list} = styles
interface Props {
  t: TFunction<"workWithUs">
}
export default function Jobs({ t }: Props) {
  return (
    <div className={jobs}>
      <div className={jobs__info}>
        <Trans t={t} i18nKey={'offers.descrip'} values={{ offers: 150, vacancies: 20 }}>
          {t('offers.descrip')}
        </Trans>
      </div>
      <div className={jobs__filter}>
        <Filter />
      </div>
      <div className={jobs__list}>
      <JobList/>
      </div>
    </div>
  )
}
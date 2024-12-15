import { useTranslation } from 'react-i18next';
import BannerWorkWithUs from '../../components/workWithUs/bannerWorkWithUs/bannerWorkWithUs'
import Jobs from '../../components/workWithUs/jobs/jobs'
import styles from './workWithUs.module.css'
const {workWithUs,workWithUs__banner}=styles
export default function WorkWithUs() {
  const { t } = useTranslation('workWithUs');  
  return (
    <div className={workWithUs}>
      <section className={workWithUs__banner}>
        <BannerWorkWithUs t={t}/>
      </section>
      <section>
        <Jobs t={t}/>
      </section>
    </div>
  )
}
import { useTranslation } from 'react-i18next';
import styles from './ourBrands.module.css'
import Brands from '../../components/ourBrands/brands/brands';
import BannerOurBrands from '../../components/ourBrands/BannerOurBrands/BannerOurBrands';
const { brands,brands__banner} = styles
export default function OurBrands() {
  const { t } = useTranslation('ourBrands');
  return (
    <div className={brands}>
      <section className={brands__banner}>
          <BannerOurBrands t={t}/>        
      </section>
      <section>
        <Brands t={t}/>
      </section>
      <section>
      </section>
    </div>
  )
}
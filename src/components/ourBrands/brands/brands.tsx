import { TFunction } from "i18next"
import styles from './brands.module.css'
import { Link } from "react-router-dom"
import { BrandInfo, BrandStructure } from "../../../helpers/interfaces/brands"
import { brandsData } from "../../../helpers/Data/brands"
const { brands, brands__items, brands__container, brands__title, brands__links, brands__social, brands__page,brands__social__items} = styles
interface Props {
  t: TFunction<"ourBrands">
}
export default function Brands({ t }: Props) {
  return (
    <div className={brands}>
      <div className={brands__title}>
        {t('brands.title')}
      </div>
      <ul className={brands__container}>
        {Object.entries(brandsData).map(([key, val]) => (
          <li key={key} className={brands__items}>
            <img src={val.img} alt="" />
            <p>{t(`brands.${key as keyof BrandStructure}.text`)}</p>
            <div className={brands__links}>
              {val.officialPage &&
                <Link to={val.officialPage} target="_blank" className={brands__page}>{t('brands.visit')}</Link>
              }
              {val.social &&
                <div className={brands__social}>
                  {Object.entries(val.social as BrandInfo).map(([key, val]) => (
                      <Link to={val.href} key={key} target="_blank" className={brands__social__items}>
                        {val.icon}
                      </Link>
                  ))}
                </div>
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
import { TFunction } from "i18next"
import styles from './banner.module.css'
import BannerContent from "./bannerContent"
const { banner, banner__img, banner__content,text__content } = styles
interface Props {
  t: TFunction<"ourBrands">
}
export default function Banner({ t }: Props) {
  return (
    <div className={banner}>
      <div className={banner__img}>
        <img src="https://alimentosprosalud.com/wp-content/uploads/2019/06/nuestrasmarcas-header.png" />
      </div>
      <BannerContent banner__content={banner__content} text__content={text__content} text={t('banner.text')} title={t('banner.title')} />
    </div>
  )
}
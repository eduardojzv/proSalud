import { TFunction } from "i18next"
import styles from './banner.module.css'
const { banner, banner__img, banner__content, text__content } = styles
interface Props {
  t: TFunction<"ourBrands">
}
import Banner from "../../others/banner/banner";
export default function BannerOurBrands({ t }: Props) {
  return <Banner banner={banner} banner__img={banner__img} banner__content={banner__content} text__content={text__content} text={t('banner.text')} title={t('banner.title')} imgSrc="https://alimentosprosalud.com/wp-content/uploads/2019/06/nuestrasmarcas-header.png" />
}
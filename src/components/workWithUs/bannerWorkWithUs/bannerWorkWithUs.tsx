import { TFunction } from "i18next";
import Banner from "../../others/banner/banner";
import styles from "./bannerWorkWithUs.module.css"
const { banner, banner__img, banner__content, text__content } = styles
interface Props {
    t: TFunction<"workWithUs">
}
export default function BannerWorkWithUs({t}:Props) {
    return <Banner banner={banner} banner__img={banner__img} banner__content={banner__content} text__content={text__content} title={t('banner.title')} imgSrc="https://alimentosprosalud.com/wp-content/uploads/2019/06/trabajaconnosotros-header.png"/>
}
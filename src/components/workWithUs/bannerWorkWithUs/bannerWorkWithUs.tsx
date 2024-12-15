import { TFunction } from "i18next";
import Banner from "../../others/banner/banner";
import styles from "./bannerWorkWithUs.module.css"
const { banner, banner__img, banner__content, text__content } = styles
interface Props {
    t: TFunction<"workWithUs">
}
console.log("banner");

export default function BannerWorkWithUs({t}:Props) {
    return <Banner banner={banner} banner__img={banner__img} banner__content={banner__content} text__content={text__content} title={t('banner.title')} imgSrc="workWithUs/workWithUsBanner.webp"/>
}
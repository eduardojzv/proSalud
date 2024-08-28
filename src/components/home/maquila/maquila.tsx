import { Link } from "react-router-dom";
import style from './maquila.module.css'
import { TFunction } from "i18next";
const {maquila,maquila__link}=style
interface Props {
  t: TFunction<"home">
}
export default function Manufacturing({t}:Props) {
  return (
    <div className={maquila}>
        <h1>{t('Manufacturing.title')}</h1>
        <p>{t('Manufacturing.text')}</p>
        <Link className={maquila__link} to={""}>{t('moreInfo')}</Link>
    </div>
  )
}
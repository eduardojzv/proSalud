
import { SVGProps } from 'react';
import { IconCertification, IconEarth, IconJob, IconProduct } from '../../../icons/others/icons';
import Counter from '../../others/counter/counter';
import styles from './achievements.module.css'
import { TFunction } from 'i18next';
const {achievements,achievements__text,achievements__items,achievements__counter}=styles
interface DataDetail {
    icon: JSX.Element
    text: string
    counter: number
}
interface Data {
    countriesExports: DataDetail
    products:DataDetail
    jobs:DataDetail
    certification:DataDetail
}
const iconProperties:SVGProps<SVGSVGElement>={
    height:"80px",
    width:"80px",
    fill:"#ffb900"
}
interface Props {
    t: TFunction<"home">
  }
export default function Achievements({t}:Props) {
    const data: Data = {
        countriesExports: {
            icon: <IconEarth {...iconProperties}/>,
            text:t('achievements.countries',{val:27}),
            counter: 27
        },
        products:{
            icon: <IconProduct {...iconProperties}/>,
            text: t('achievements.brands',{val:16}),
            counter: 16
        },
        jobs:{
            icon: <IconJob {...iconProperties}/>,
            text: t('achievements.jobs',{val:1200}),
            counter: 1200
        },
        certification:{
            icon: <IconCertification {...iconProperties}/>,
            text: t('achievements.certification',{val:17}),
            counter: 17
        }
    }
    return (
        <ul className={achievements}>
            {Object.entries(data).map(([key, val]) => (
                <li key={key} className={achievements__items}>
                    {val.icon}
                    <h1 className={achievements__counter}>
                        <Counter targetNumber={val.counter} />
                    </h1>
                    <p className={achievements__text}>{val.text}</p>
                </li>
            ))}
        </ul>
    );

}

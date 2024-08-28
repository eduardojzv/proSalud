import { useTranslation } from "react-i18next";

import styles from "./home.module.css"
import Brands from "../../components/home/brands/brands";
import Certifications from "../../components/home/certification/certifications";
import Carrousel from "../../components/home/carrousel/carrousel";
import Achievements from "../../components/home/achievements/Achievements";
import Manufacturing from "../../components/home/maquila/maquila";
import useIntersectionObserver from "../../helpers/intersectionObserver/intersectionObserver";
interface IntersectionObserverOptions extends IntersectionObserverInit { }
const { home, home__carrousel, home__brands, home__certification,home__achievements,home__manufacturing,visible } = styles
export default function Home() {
    const { t } = useTranslation('home');
    const IntersectionOpc: IntersectionObserverOptions = { root: null, rootMargin: '-100px' }
    const [BrandsRef, IntersectingBrands] = useIntersectionObserver(IntersectionOpc)
    const [CertificationsRef, IntersectingCertifications] = useIntersectionObserver(IntersectionOpc)
    const [AchievementsRef, IntersectingAchievements] = useIntersectionObserver(IntersectionOpc)
    const [ManufacturingRef, IntersectingManufacturing] = useIntersectionObserver(IntersectionOpc)

    return (
        <div className={home}>
            <section className={home__carrousel}>
                <Carrousel t={t} />
            </section>
            <section className={`${home__brands} ${IntersectingBrands ? visible : ''}`} ref={BrandsRef}>
                {IntersectingBrands &&
                        <Brands t={t} />
                }
            </section>
            <section className={`${home__certification} ${IntersectingCertifications ? visible : ''}`} ref={CertificationsRef}>
                {IntersectingCertifications &&
                        <Certifications t={t} />
                }
            </section>
            <section className={`${home__achievements} ${IntersectingAchievements ? visible : ''}`} ref={AchievementsRef}>
            {IntersectingAchievements &&
                <Achievements t={t} />
            }
            </section>
            <section className={`${home__manufacturing} ${IntersectingManufacturing ? visible : ''}`} ref={ManufacturingRef}>
            {IntersectingManufacturing &&
                <Manufacturing t={t} />
            }
            </section>
        </div>
    )
}
import { Link } from 'react-router-dom'
import styles from './footer.module.css'
import menuStyles from '../menu/menu.module.css'
import { useTranslation } from 'react-i18next'
const { footer__container, footer__left, footer__right, footer__left__info, logo } = styles
const { nav__item, nav__link } = menuStyles
export default function Footer() {
    const { t } = useTranslation('footer');
    return (
        <footer className={footer__container}>
            <div className={footer__left}>
                <img src="/proSaludLogoColor.webp" alt="" className={logo} />
                <div className={footer__left__info}>
                    <p>{t('location')}</p>
                    <p>
                        <a href="mailto:info@prosalud.com" className={`${nav__link} ${nav__item}`}>{t('email')}</a>
                    </p>
                    <p>{t('postalCode')}</p>
                    <p>
                        <a href="tel:+50625047676" className={`${nav__link} ${nav__item}`}>{t('phoneNumber')}</a>
                    </p>
                    <Link to={"/privacy-policy"} className={`${nav__link} ${nav__item}`}>{t('policy')}</Link>
                </div>
            </div>
            <div className={footer__right}>
                <span>{t('rightsReserved',{val:2019})}</span>
            </div>
        </footer>
    )
}
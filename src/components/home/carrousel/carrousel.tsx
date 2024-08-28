import stylesSliders from './carrousel.module.css'
import stylesSwiper from "./firstSwiper.module.css"

import i18next,{ TFunction} from "i18next";
import {Pagination } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import { DataHomeCarrousel } from "../../../helpers/interfaces/home";
import CarrouselImgs from "../../others/swiper";
import { Trans } from 'react-i18next';
import SlideContent from './slideContent';
const { slide__content, slide01__text, slide01__video, slide01__subText, otherSlides__text } = stylesSliders
interface Props{
    t: TFunction<"home">
}
export default function Carrousel({t}:Props) {
    const { language} = i18next
    const swiperConfig:SwiperOptions = {
        pagination: {
            clickable: true,
            horizontalClass:stylesSwiper.swiper__pagination,
            bulletActiveClass:stylesSwiper.swiper__activeBullet,
          },
        zoom: {
          minRatio: 5,
          maxRatio: 10,
        },
        loop: true,
        modules: [Pagination],
      };
    const componentsSlides = {
        slide01: <div className={slide__content}>
            <div className={slide01__text}>
                <p className="upperCase">
                    <Trans t={t} i18nKey='carrousel.slide01.text01'>
                        {t('carrousel.slide01.text01')}
                    </Trans>
                </p>
                <p className={`${slide01__subText} upperCase`}>{t('carrousel.slide01.text02')}</p>
            </div>
            <div className={slide01__video}>
                <iframe src="https://www.youtube.com/embed/abf9euC671k?si=8CJ7DAWu3IC33GaH" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
        </div>,
        slide02: <SlideContent text={t('carrousel.slide02.text01')} language={language} otherSlides__text={otherSlides__text} slide__content={slide__content}  />,
        slide03: <SlideContent text={t('carrousel.slide03.text01')} language={language} otherSlides__text={otherSlides__text} slide__content={slide__content}  />,
        slide04: <SlideContent text={t('carrousel.slide04.text01')} language={language} otherSlides__text={otherSlides__text} slide__content={slide__content}  />,
        slide05: <SlideContent text={t('carrousel.slide05.text01')} language={language} otherSlides__text={otherSlides__text} slide__content={slide__content}  />,
    }
    const dataHomeCarrousel: DataHomeCarrousel = {
        slide01: {
            img: "http://alimentosprosalud.com/wp-content/uploads/2019/06/slider-home-01-overlay.jpg",
            element: componentsSlides.slide01
        },
        slide02: {
            img: "http://alimentosprosalud.com/wp-content/uploads/2019/06/slider-home-02-overlay.jpg",
            element: componentsSlides.slide02
        },
        slide03: {
            img: "http://alimentosprosalud.com/wp-content/uploads/2019/06/slider-home-03-overlay.jpg",
            element: componentsSlides.slide03
        },
        slide04: {
            img: "http://alimentosprosalud.com/wp-content/uploads/2019/06/slider-home-04-overlay.jpg",
            element: componentsSlides.slide04
        },
        slide05: {
            img: "https://alimentosprosalud.com/wp-content/uploads/2019/06/slider-home-05-overlay.jpg",
            element: componentsSlides.slide05
        }
    }
    return <CarrouselImgs data={dataHomeCarrousel} styles={stylesSwiper} swiperConfig={swiperConfig} />
}
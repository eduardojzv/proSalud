import { Link } from "react-router-dom";
import styles from "./certifications.module.css"
import CarrouselImgs from "../../others/swiper";
import { DataHomeCarrousel } from "../../../helpers/interfaces/home";
import { SwiperOptions } from "swiper/types";
import stylesSwiper from './certificationSwiper.module.css'
import { Pagination } from "swiper/modules";
import { menuItems } from "../../../helpers/Data/menu";
import { TFunction } from "i18next";
const { certification, certification__text, certification__title, certification__link, container__swiper, certification__info } = styles
interface Props {
  t: TFunction<"home">
}
export default function Certifications({t}:Props) {
  const swiperConfig: SwiperOptions = {
    // spaceBetween: 5,
    pagination: {
      clickable: true,
      horizontalClass: stylesSwiper.swiper__pagination,
      bulletActiveClass: stylesSwiper.swiper__activeBullet,
    },
    breakpoints: {
      520: {
        slidesPerView: 2,
        spaceBetween: 5,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 4,
      },
    },

    modules: [Pagination],
  };
  const data: DataHomeCarrousel = {
    slide01: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2020/12/b.jpg",
    },
    slide02: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/06/certificacion-03.png",
    },
    slide03: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/06/certificacion-05.png",
    },
    slide04: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/06/certificacion-06.png",
    },
    slide05: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/06/certificacion-07.png",
    },
    slide06: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/06/certificacion-08.png",
    },
    slide07: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/06/certificacion-09.png",
    }
  }
  return (
    <div className={certification}>
      <div className={certification__info}>
        <h1 className={certification__title}>{t('certificaction.title')}</h1>
        <p className={certification__text}>{t('certificaction.text')}</p>
        <Link className={`${certification__link} upperCase`} to={menuItems.items.sustainability.href}>{t('certificaction.moreInfo')} </Link>
      </div>
      <div className={container__swiper}>
        <CarrouselImgs data={data} styles={stylesSwiper} swiperConfig={swiperConfig} />
      </div>
    </div>
  )
}
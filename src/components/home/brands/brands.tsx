import { TFunction } from 'i18next'
import styles from './brands.module.css'
import { DataHomeCarrousel } from '../../../helpers/interfaces/home'
import CarrouselImgs from '../../others/swiper'
import stylesSwiper from "./brandSwiper.module.css"
import { Pagination } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'
import { Link } from 'react-router-dom'
import { brandsData } from '../../../helpers/Data/brands'
interface Props {
  t: TFunction<"home">
}
export default function Brands({ t }: Props) {
  const { brands__container, visit } = styles
  const SlideContent = ({ url }: { url: string }) => (
    <>
      <Link className={visit} to={url}>{t('visit')}</Link>
    </>
  );
  const data: DataHomeCarrousel = {
    slide01: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/07/Sardimar.jpg",
      element: <SlideContent url={brandsData.sardimar.officialPage || ""} />
    },
    slide02: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/07/PacificoAzul.jpg",
      element: <SlideContent url='#' />
    },
    slide03: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/07/splash.jpg",
      element: <SlideContent url={brandsData.splash.officialPage || ""} />
    },
    slide04: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/07/Gaviota.jpg",
      element: <SlideContent url='#' />
    },
    slide05: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/07/bluepacific.jpg",
      element: <SlideContent url='#' />
    },
    slide06: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/07/aurora.jpg",
      element: <SlideContent url='#' />
    },
    slide07: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/07/DelNorte.jpg",
      element: <SlideContent url='#' />
    },
    slide08: {
      img: "https://alimentosprosalud.com/wp-content/uploads/2019/07/verdemar.jpg",
      element: <SlideContent url='#' />
    }
  }
  const swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    pagination: {
      clickable: true,
      horizontalClass: stylesSwiper.swiper__pagination,
      bulletActiveClass: stylesSwiper.swiper__activeBullet,
    },
    breakpoints: {
      520: {
        slidesPerView: 2,
        spaceBetween: 20,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 4,
      },
    },

    modules: [Pagination],
  };
  return (
    <div className={brands__container}>
      <h1 className='upperCase'>{t('brands')}</h1>
      <CarrouselImgs data={data} styles={stylesSwiper} swiperConfig={swiperConfig} />
    </div>
  )
}
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { DataHomeCarrousel } from '../../helpers/interfaces/home';
import { SwiperOptions } from 'swiper/types';
interface Props {
    data: DataHomeCarrousel
    styles: CSSModuleClasses
    swiperConfig: SwiperOptions
}
export default function CarrouselImgs({ data, styles, swiperConfig }: Props) {
    const { swiper, swiper__slide, swiper__content, slider__img } = styles
    return (
        <>
            <Swiper
                {...swiperConfig}
                className={swiper}
            >
                {
                    Object.entries(data).map(([key, val]) => (
                        <SwiperSlide key={key} className={swiper__slide}>
                            <div className={slider__img}>
                                <img src={val.img} alt={val.img} />
                                <div className={swiper__content}>
                                    {val.element}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}
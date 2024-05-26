import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import ReviewCard from './ReviewCard'

const ReviewSlider = () => {
    return (
        <div className='w-3/4'>
            <Swiper
                slidesPerView={2}
                spaceBetween={25}
                loop={true}
                freeMode={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="w-full"
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 25,
                    },
                }}
            >
                <SwiperSlide>
                    <ReviewCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ReviewCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ReviewCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ReviewCard/>
                </SwiperSlide>
                <SwiperSlide>
                    <ReviewCard/>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default ReviewSlider
import React, { useEffect } from 'react'
import Card from './Card'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

const CardList = ({cardData}) => {


    useEffect(() => {
        // API call for fetching the card data
    }, [])


    return (
        <div className='py-14'>
            <Swiper
                slidesPerView={4.5}
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
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                    },
                    520: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    720: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    920: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                    1120: {
                        slidesPerView: 5,
                        spaceBetween: 25,
                    }

                }}
            >
                {
                    cardData.map(card => (
                        <SwiperSlide key={card.id}>
                            <Card cardInfo={card} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default CardList
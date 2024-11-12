import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { Footer } from "../components/Footer/Footer";

export const Home = () => {
    return (
        <div className="content home-page">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src="./img/swiper/1.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./img/swiper/2.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./img/swiper/3.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./img/swiper/4.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./img/swiper/5.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./img/swiper/zub.jpg" alt="" />
                </SwiperSlide>
            </Swiper>

            <div className=""></div>

            <Footer></Footer>
        </div>
    );
};

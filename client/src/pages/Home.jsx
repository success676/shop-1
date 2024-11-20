import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Footer } from "../components/Footer/Footer";
import { Link } from "react-router-dom";

export const Home = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="content home-page">
            <div className="home-page-swiper">
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
            </div>

            <div className="container">
                <section className="about-us">
                    <h2>О нас</h2>
                    <p>
                        Cailin Kelai — это дорогой бренд мужской и женской
                        одежды. Мы занимаемся созданием уникальных и стильных
                        вещей, которые подчеркнут вашу индивидуальность и
                        элегантность. Наш бренд стремится к совершенству в
                        каждой детали, чтобы вы всегда чувствовали себя уверенно
                        и комфортно.
                    </p>
                </section>
            </div>

            <div className="loyalty">
                <h2>С нами сотрудничают</h2>
                <div className="marquee">
                    <div className="track">
                        <div className="content">
                            &nbsp;Gucci &nbsp;Prada &nbsp;Chanel &nbsp;Louis
                            Vuitton &nbsp;Dior &nbsp;Burberry &nbsp;Versace
                            &nbsp;Armani &nbsp;Gucci &nbsp;Prada &nbsp;Chanel
                            &nbsp;Louis Vuitton &nbsp;Dior &nbsp;Burberry
                            &nbsp;Versace &nbsp;Armani
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <section className="faq">
                    <h2>Частые вопросы</h2>
                    <div className="faq-item">
                        <div
                            className="faq-header"
                            onClick={() => handleToggle(0)}
                        >
                            <h3>Как я могу вернуть товар?</h3>
                            <span>{activeIndex === 0 ? "-" : "+"}</span>
                        </div>
                        {activeIndex === 0 && (
                            <div className="faq-content">
                                <p>
                                    Вы можете вернуть товар в течение 14 дней
                                    после покупки, если он не был использован и
                                    сохранил товарный вид.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="faq-item">
                        <div
                            className="faq-header"
                            onClick={() => handleToggle(1)}
                        >
                            <h3>Какие способы оплаты доступны?</h3>
                            <span>{activeIndex === 1 ? "-" : "+"}</span>
                        </div>
                        {activeIndex === 1 && (
                            <div className="faq-content">
                                <p>
                                    Мы принимаем оплату банковскими картами,
                                    электронными кошельками и наличными при
                                    получении.
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="faq-item">
                        <div
                            className="faq-header"
                            onClick={() => handleToggle(2)}
                        >
                            <h3>Что такое налог 5%?</h3>
                            <span>{activeIndex === 2 ? "-" : "+"}</span>
                        </div>
                        {activeIndex === 2 && (
                            <div className="faq-content">
                                <p>
                                    Налог 5% — это налог на добавленную
                                    стоимость (НДС), который включается в
                                    стоимость товаров и услуг, приобретаемых в
                                    нашем интернет-магазине.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <div className="call-to-action">
                <h2>На шопинг!</h2>
                <p>
                    Найдите свой стиль с Cailin Kelai. Получите эксклюзивные
                    предложения и скидки на нашу коллекцию.
                </p>
                <Link to="/main" className="cta-button">
                    Перейти к покупкам
                </Link>
            </div>

            <Footer />
        </div>
    );
};

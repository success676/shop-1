import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaShoppingBag } from "react-icons/fa";
import styles from "./Home.module.scss";

export const Home = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className={styles.homePage}>
            <div className={styles.heroSwiper}>
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
                    className={styles.swiper}
                >
                    <SwiperSlide>
                        <img
                            src="./img/swiper/1.jpg"
                            alt="Fashion collection"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./img/swiper/2.jpg" alt="Luxury style" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./img/swiper/3.png" alt="Elegant outfits" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="./img/swiper/zub.jpg" alt="Brand showcase" />
                    </SwiperSlide>
                </Swiper>
            </div>

            <section className={styles.aboutSection}>
                <div className={styles.container}>
                    <div className={styles.aboutCard}>
                        <h2 className={styles.sectionTitle}>О нас</h2>
                        <div className={styles.aboutContent}>
                            <p>
                                Cailin Kelai — это дорогой бренд мужской и
                                женской одежды. Мы занимаемся созданием
                                уникальных и стильных вещей, которые подчеркнут
                                вашу индивидуальность и элегантность. Наш бренд
                                стремится к совершенству в каждой детали, чтобы
                                вы всегда чувствовали себя уверенно и комфортно.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.partnersSection}>
                <h2 className={styles.sectionTitle}>Наши партнеры</h2>
                <div className={styles.marquee}>
                    <div className={styles.track}>
                        <div className={styles.content}>
                            &nbsp;Gucci &nbsp;Prada &nbsp;Chanel &nbsp;Louis
                            Vuitton &nbsp;Dior &nbsp;Burberry &nbsp;Versace
                            &nbsp;Armani &nbsp;Gucci &nbsp;Prada &nbsp;Chanel
                            &nbsp;Louis Vuitton &nbsp;Dior &nbsp;Burberry
                            &nbsp;Versace &nbsp;Armani
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.faqSection}>
                <div className={styles.container}>
                    <div className={styles.faqCard}>
                        <h2 className={styles.sectionTitle}>Частые вопросы</h2>

                        <div className={styles.faqItem}>
                            <div
                                className={styles.faqHeader}
                                onClick={() => handleToggle(0)}
                            >
                                <h3>Как я могу вернуть товар?</h3>
                                <span>
                                    {activeIndex === 0 ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </span>
                            </div>
                            {activeIndex === 0 && (
                                <div className={styles.faqContent}>
                                    <p>
                                        Вы можете вернуть товар в течение 14
                                        дней после покупки, если он не был
                                        использован и сохранил товарный вид.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className={styles.faqItem}>
                            <div
                                className={styles.faqHeader}
                                onClick={() => handleToggle(1)}
                            >
                                <h3>Какие способы оплаты доступны?</h3>
                                <span>
                                    {activeIndex === 1 ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </span>
                            </div>
                            {activeIndex === 1 && (
                                <div className={styles.faqContent}>
                                    <p>
                                        Мы принимаем оплату банковскими картами,
                                        электронными кошельками и наличными при
                                        получении.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className={styles.faqItem}>
                            <div
                                className={styles.faqHeader}
                                onClick={() => handleToggle(2)}
                            >
                                <h3>Что такое налог 5%?</h3>
                                <span>
                                    {activeIndex === 2 ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </span>
                            </div>
                            {activeIndex === 2 && (
                                <div className={styles.faqContent}>
                                    <p>
                                        Налог 5% — это налог на добавленную
                                        стоимость (НДС), который включается в
                                        стоимость товаров и услуг, приобретаемых
                                        в нашем интернет-магазине.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <div className={styles.ctaCard}>
                        <h2>На шопинг!</h2>
                        <p>
                            Найдите свой стиль с Cailin Kelai. Получите
                            эксклюзивные предложения и скидки на нашу коллекцию.
                        </p>
                        <Link to="/main" className={styles.ctaButton}>
                            <FaShoppingBag className={styles.buttonIcon} />
                            Перейти к покупкам
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

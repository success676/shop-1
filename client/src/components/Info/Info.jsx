import React from "react";

import AppContext from "../../context";

import styles from './Info.module.scss'

const Info = ({ title, image, description }) => {
    const { setCartOpened } = React.useContext(AppContext);

    return (
        <div className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}>
            <img
                className="mb-20"
                width={120}
                src={image}
                alt="Empty"
            />
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={() => setCartOpened()} className={`${styles.greenButton} greenButton`}>
                <img src="./img/arrow.svg" alt="Arrow" />
                Вернуться назад
            </button>
        </div>
    );
};

export default Info;

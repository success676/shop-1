import React from "react";
import { useNavigate } from "react-router-dom";

import styles from './NoItems.module.scss'

const NoItems = ({ imageUrl, title, description, buttonText }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.root}>
            <img
                src={imageUrl}
                alt="Sad Face"
                className={styles.sadFaceImg}
            />
            <h2>{title}</h2>
            <p>{description}</p>
            <button className={styles.backButton} onClick={() => navigate("/main")}>
                {buttonText}
            </button>
        </div>
    );
};

export default NoItems;

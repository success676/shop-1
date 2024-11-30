import React from "react";
import { useNavigate } from "react-router-dom";

const NoItems = ({ imageUrl, title, description, buttonText }) => {
    const navigate = useNavigate();

    return (
        <div className="no-items-container">
            <img
                src={imageUrl}
                alt="Sad Face"
                className="sad-face-img"
            />
            <h2>{title}</h2>
            <p>{description}</p>
            <button className="back-button" onClick={() => navigate("/main")}>
                {buttonText}
            </button>
        </div>
    );
};

export default NoItems;

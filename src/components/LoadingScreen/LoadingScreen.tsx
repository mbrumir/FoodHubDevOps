import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="LoadingScreen" style={{zIndex: 1000}}>
            <div className="LoadingScreen--main">
                <svg className="LoadingScreen--main__spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        className="LoadingScreen--main__spinner__path"
                        fill="none"
                        strokeWidth="6"
                        strokeLinecap="round"
                        cx="33"
                        cy="33"
                        r="30"
                    ></circle>
                </svg>
            </div>
        </div>
    );
};

export default LoadingScreen;

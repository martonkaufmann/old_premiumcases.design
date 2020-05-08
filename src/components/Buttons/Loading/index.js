import React from 'react';

import './style.css';

const LoadingButton = ({ className, ...props }) => (
    <button className={`${className} flex justify-center items-center loading h-12`} {...props}>
        <div className="w-2 h-2 bg-white opacity-50 rounded"></div>
        <div className="w-2 h-2 bg-white opacity-50 rounded mx-2"></div>
        <div className="w-2 h-2 bg-white opacity-50 rounded"></div>
    </button>
);

export default LoadingButton;

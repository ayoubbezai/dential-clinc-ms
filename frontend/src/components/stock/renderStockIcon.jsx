import React from 'react';
import { FaExclamationCircle, FaTimes, FaExclamationTriangle, FaCheckCircle, FaThumbsUp, FaQuestionCircle } from 'react-icons/fa';

const renderStockIcon = (stockLevel) => {
    switch (stockLevel) {
        case 'Low':
            return <FaExclamationCircle className="text-red-500" />;
        case 'Medium':
            return <FaExclamationTriangle className="text-yellow-500" />;
        case 'Good':
            return <FaCheckCircle className="text-green-500" />;
        case 'Very Good':
            return <FaThumbsUp className="text-blue-500" />;
        case 'Unknown':
            return <FaQuestionCircle className="text-gray-500" />;
        case 'Out Of Stock':
            return <FaTimes className="text-red-500" />;
        default:
            return <FaQuestionCircle className="text-gray-500" />;
    }
};

export default renderStockIcon;

import React from 'react';
import { Alert } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

export const GoodResponse = ({ text }) => {
    return (
        <Alert variant="success" className="mb-0 d-flex align-items-center" >
            <FaCheckCircle size={20} className="me-2" />
            {text}
        </Alert>
    );
};



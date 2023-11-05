import React from 'react';
import { Alert } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';

export const GoodResponse = ({ text }) => {
    return (
        <Alert variant="success">
            <FaCheckCircle size={20} style={{ marginRight: '10px' }} />
            {text}
        </Alert>
    );
};



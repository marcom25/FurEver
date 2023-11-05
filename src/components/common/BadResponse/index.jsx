
import React from 'react';
import { Alert } from 'react-bootstrap';
import { BsFillXCircleFill } from 'react-icons/bs';

export const BadResponse = ({ text }) => {
  return (
    <Alert variant="danger" className="mb-0 d-flex align-items-center">
      <BsFillXCircleFill size={20} className="me-2" />
      <span>{text}</span>
    </Alert>
  );
};




import React from 'react';
import { Alert } from 'react-bootstrap';
import { BsFillXCircleFill } from 'react-icons/bs';

export const BadResponse = ({ text }) => {
  return (
    <Alert variant="danger" className="d-flex align-items-center">
      <BsFillXCircleFill className="me-2" />
      <span>{text}</span>
    </Alert>
  );
};



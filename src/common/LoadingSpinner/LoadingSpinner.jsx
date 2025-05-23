import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '60vh' }}
    >
      <Spinner animation="border" variant="danger" style={{ width: '5rem', height: '5rem' }} />
    </div>
  );
};

export default LoadingSpinner;
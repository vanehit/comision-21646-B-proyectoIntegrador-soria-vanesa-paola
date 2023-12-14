import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-body">
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="warning" />
      </div>
    </div>
  );
};

export default Loader;

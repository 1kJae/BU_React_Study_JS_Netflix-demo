import React from 'react'
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">Oops!</h1>
      <h2 className="notfound-subtitle">404 - PAGE NOT FOUND</h2>
      <p className="notfound-description">
        The page you are looking for might have been removed,<br />
        had its name changed or is temporarily unavailable.
      </p>
      <button className="notfound-button" onClick={() => navigate('/')}>
        GO TO HOMEPAGE
      </button>
    </div>
  );
};

export default NotFoundPage
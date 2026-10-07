import React from 'react';
import '../styles/Loading.css'; // Importing normal CSS file

export default function Loading({ message = 'Loading, please wait...' }) {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner"></div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
}

import React from 'react';
import './Button3.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Button5() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to navigate to the first page
  const navigateToFirstPage = () => {
    navigate('/HecHms'); // Adjust '/firstPage' to your actual route
  };

  // Function to navigate to the second page
  const navigateToSecondPage = () => {
    navigate('/Final'); // Adjust '/secondPage' to your actual route
  };

  return (
    <div className="action-buttons">
      <button onClick={navigateToFirstPage} className="go-first-page-button">Go Back</button>
      <button onClick={navigateToSecondPage} className="go-second-page-button">Continue</button>
    </div>
  );
}

export default Button5;

import React from 'react';
import './Button3.css';
import { useNavigate } from 'react-router-dom';

function StartHechms() {
  const navigate = useNavigate();

  // Function to handle the HEC-HMS processing and then navigate
  const navigateToFirstPage = async () => {
    try {
      // Make a GET request to the server
      const response = await fetch('http://10.7.186.234:5000/open_hechms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Log the message to the console and alert the user
      console.log(data.message);
      alert(data.message);

      // Navigate to the first page or another route as needed
      navigate('/firstPage'); // Use the actual path you want to navigate to

    } catch (error) {
      // Log the error to the console and alert the user
      console.error('Error starting HEC-HMS processing:', error);
      alert('Failed to start HEC-HMS processing. See console for details.');
    }
  };

  return (
    <div className="action-buttons">
      <button onClick={navigateToFirstPage} className="go-first-page-button">
        Start HecHms Processing 
      </button>
    </div>
  );
}

export default StartHechms;

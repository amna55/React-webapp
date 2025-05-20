import React, { useState } from 'react';
import './Button3.css';
import { useNavigate} from 'react-router-dom';
import 'leaflet/dist/leaflet.css';  // Ensure this path is correct as per your node_modules structure

function StartHecras() {
  const [loading, setLoading] = useState(false);

  const startHecRasProcessing = () => {
    setLoading(true);
    fetch('http://10.7.192.244:5000/open_hecras', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('HEC-RAS processing started successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error starting HEC-RAS processing: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="action-buttons">
        <button onClick={startHecRasProcessing} className="go-first-page-button">
          Start HecRas Processing
        </button>
    </div>
  );
}

export default StartHecras; // Make sure exports match imports

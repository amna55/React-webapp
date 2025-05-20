import React, { useState } from 'react';
import './Button3.css';  // Assuming this CSS covers basic button and layout styles for all components
import './HecHmsprcs.css';  // Additional CSS for HEC-HMS processing descriptions
import './hydro.css';  // CSS for the hydrologic data visualization interface
import { useNavigate } from 'react-router-dom';

function UnifiedComponent() {
  const [selectedSubbasin, setSelectedSubbasin] = useState('');
  const [selectedGraph, setSelectedGraph] = useState('');
  const [imageVisible, setImageVisible] = useState(false);
  const [graphImage, setGraphImage] = useState(null);

  const navigate = useNavigate();

  const subBasinOptions = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13', '14', '16', '17', '33', '34'
  ];

  const handleGenerateGraph = async () => {
    try {
      const response = await fetch('http://10.7.192.244:5000/generate_graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subbasin_number: parseInt(selectedSubbasin), attribute: selectedGraph })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setGraphImage(responseData.image);
      setImageVisible(true);
    } catch (error) {
      console.error('Error generating graph:', error);
      alert('Failed to generate graph. See console for details.');
    }
  };

  const handleHecHmsProcessing = async () => {
    try {
      const response = await fetch('http://10.7.192.244:5000/open_hechms_era5', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(data.message);
      navigate('/firstPage'); // Adjust the navigation target as needed
    } catch (error) {
      console.error('Error starting HEC-HMS processing:', error);
      alert('Failed to start HEC-HMS processing. See console for details.');
    }
  };

  return (
    <div className="combined-container">
      <div className="description-container">
        <h1>HecHms Processing</h1>
        <p>HecHms Processing involves a series of steps to analyze and model hydrological data. This includes data preparation, simulation, and analysis of hydrologic and hydraulic models. It's crucial in water resources engineering for flood forecasting, urban drainage, and water quality studies.</p>
      </div>
      <div className='hechmsbutton'>
        < button onClick={handleHecHmsProcessing} className="go-first-page-button">Start HEC-HMS Processing</button>
      </div>
      <div className="gallery-container">
        <img src="images/subbasins.jpg" alt="Initial Image" className="initial-image" />
        <div className='select-features'>
          <h2>Select a Subbasin number</h2>
          <select value={selectedSubbasin} onChange={(e) => setSelectedSubbasin(e.target.value)} className="Subbasin-dropdown">
            <option value=""></option>
            {subBasinOptions.map(subbasin => (
              <option key={subbasin} value={subbasin}>{subbasin}</option>
            ))}
          </select>
          <h2>Select type of graph required</h2>
          <select value={selectedGraph} onChange={(e) => setSelectedGraph(e.target.value)} className="graph-dropdown">
            <option value=""></option>
            <option value="FLOW">Out-flow</option>
            <option value="PRECIP-EXCESS">Excess Precipitation</option>
            <option value="FLOW-BASE">Base flow</option>
            <option value="PRECIP-LOSS">Precipitation-loss</option>
          </select>
          <button onClick={handleGenerateGraph} disabled={!selectedSubbasin || !selectedGraph} className="generate-btn">Generate Graph</button>
        </div>
        {imageVisible && (
          <div className="image-display">
            <button onClick={() => setImageVisible(false)} className="close-btn">X</button>
            <img src={`data:image/png;base64,${graphImage}`} alt={`Subbasin ${selectedSubbasin}`} className="graph-image" />
          </div>
        )}
      </div>
      <div className="action-buttons">
        <button onClick={() => navigate('/sign-up')} className="go-first-page-button">Go Back</button>
        <button onClick={() => navigate('/HecRas')} className="go-second-page-button">Continue</button>
      </div>
    </div>
  );
}

export default UnifiedComponent;

import React, { useState } from 'react';
import './hydro.css'; // Make sure to create this CSS file

function Hydro() {
  const [selectedSubbasin, setSelectedSubbasin] = useState('');
  const [selectedGraph, setSelectedGraph] = useState('');
  const [imageVisible, setImageVisible] = useState(false);
  const [graphImage, setGraphImage] = useState(null); // State to store the graph image data

  // Define the sub basin options
  const subBasinOptions = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '13', '14', '16', '17', '33', '34'
  ];

  const handleChangeSubbasin = (event) => {
    setSelectedSubbasin(event.target.value);
    setImageVisible(false); // Hide the image when a new selection is made
  };

  const handleChangeGraph = (event) => {
    setSelectedGraph(event.target.value);
    setImageVisible(false); // Hide the image when a new selection is made
  };

  const handleDownload = () => {
    const imageUrl = graphImage;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'graph.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateGraph = async () => {
    try {
      const url = 'http://10.7.186.234:5000/generate_graph'; // Replace with your backend endpoint
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subbasin_number: parseInt(selectedSubbasin), // Convert to integer
          attribute: selectedGraph
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Graph generated successfully:', responseData);

      // Set the graph image data in state
      setGraphImage(responseData.image);

      // Show the image
      setImageVisible(true);
  
    } catch (error) {
      console.error('Error generating graph:', error);
      // Handle the error condition
    }
  };
  

  return (
    <div className="gallery-container">
      <img src="images/subbasins.jpg" alt="Initial Image" className="initial-image" />
      <div className='select-features' >
        <h2>Select a Subbaisin number</h2>
        <select value={selectedSubbasin} onChange={handleChangeSubbasin} className="Subbasin-dropdown">
          <option value=""></option>
          {subBasinOptions.map((Subbasin, index) => (
            <option key={index} value={Subbasin}>{Subbasin}</option>
          ))}
        </select>
        <h2>Select type of graph required</h2>
        <select value={selectedGraph} onChange={handleChangeGraph} className="graph-dropdown">
          <option value=""></option>
          <option value="FLOW">Out-flow</option>
          <option value="PRECIP-EXCESS">Excess Precipitation</option>
          <option value="FLOW-BASE">Base flow</option>
          <option value="PRECIP-LOSS">Precipitation-loss</option>
        </select>
      </div>
      <button onClick={handleGenerateGraph} disabled={!selectedSubbasin || !selectedGraph} className="generate-btn">Generate Graph</button>
      {imageVisible && (
        <div className="image-display">
          <button onClick={handleDownload} className="download-btn">Download</button>
          <button onClick={() => setImageVisible(false)} className="close-btn">X</button>
          <img src={`data:image/png;base64,${graphImage}`} alt={`Subbasin ${selectedSubbasin}`} />
        </div>
      )}
    </div>
  );
}

export default Hydro;

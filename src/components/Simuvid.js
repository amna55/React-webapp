import React from 'react';
import './simuvid.css'; // Make sure the file name matches the case

const Simuvid = () => {
  
    return (
      <>
      <div className="heading">
        EXAMPLE SIMULATION
      </div>
      <div className="video-container">
          <video controls>
            <source src="/videos/simu.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      </div>
      <div className="description">
        This is the example simulation of Kabul river basin.
      </div>
      </>
    );
  }
  

export default Simuvid;


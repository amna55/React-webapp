import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { GeoJSON } from 'leaflet';

function HecRasP() {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    async function fetchShapefile() {
      try {
        const response = await fetch('http://localhost:8080/geoserver/fypbasin/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fypbasin%3Asubbasins&maxFeatures=50&outputFormat=application%2Fjson');
        const data = await response.json();
        setGeojsonData(data);
      } catch (error) {
        console.error('Error fetching shapefile:', error);
      }
    }

    fetchShapefile();
  }, []);

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        {geojsonData && <GeoJSON data={geojsonData} />}
      </MapContainer>
    </div>
  );
}

export default HecRasP;

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LivePage.css';

function LivePage({ apiKey }) {

  const positions = [
    [13.736717, 100.523186],
    [13.724894, 100.493025],
    [13.758703, 100.534437]
  ];



  return (
    <div>
      <div className='maps'>
          <MapContainer 
            className='MapBox'
            center={[13.736717, 100.523186]}
            zoom={13}
            zoomControl={false}
          >
            <TileLayer url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?apiKey=${apiKey}`} />
            {positions.map((position, index) => (
            <Marker key={index} position={position}>
              
              <Popup>
                ประเทศไทย! <br /> ยินดีต้อนรับ!
              </Popup>
            </Marker>
          ))}
          </MapContainer>
        <div className='containerBox'>
            <div className='chat_text'>Chat</div>
        </div>
          

      </div>
    </div>
    
    
  );
}

export default LivePage;

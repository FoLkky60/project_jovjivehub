import React, { useState } from 'react';
import './CreateRoom.css';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomLocation, setRoomlocation] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Room Name:', roomName);
    console.log('Room location:', roomLocation);
    setRoomName('');
    setRoomlocation('');
    setShowPopup(false);
  };

  return (
    <div className="create-room-container">
      <button className="floating-button" onClick={() => setShowPopup(true)}>+</button>
      
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-contents" onClick={(e) => e.stopPropagation()}>
       
            <form className='formHeader' onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="roomName">Room Name:</label>
                <input
                  type="text"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
                <label htmlFor="roomName">Location:</label>
                <input
                  type="text"
                  id="roomLocation"
                  value={roomLocation}
                  onChange={(e) => setRoomName(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit">Create Room</button>
              <button type="button" className="close-button" onClick={() => setShowPopup(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;

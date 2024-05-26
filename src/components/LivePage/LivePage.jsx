import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LivePage.css';

function LivePage({ apiKey }) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const latestCommentRef = useRef(null);

  const handleInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const submitComment = () => {
    if (commentInput.trim() !== '') {
      setComments([...comments, commentInput]);
      setCommentInput('');
    }
  };

  useEffect(() => {
    if (latestCommentRef.current) {
      latestCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);

  const positions = [
    [13.736717, 100.523186],
    [13.724894, 100.493025],
    [13.758703, 100.534437]
  ];

  return (
    <div className='mapContainer'>
      <div className='maps'>
        <MapContainer
          className='MapBox'
          center={[13.736717, 100.523186]}
          zoom={13}
          zoomControl={false}
        >
          <div className="roomName">
            <div className='textRoom'>เหงาจาง</div>
          </div>
          <TileLayer url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?apiKey=${apiKey}`} />
          {positions.map((position, index) => (
            <Marker key={index} position={position}>
              <Popup>
                ประเทศไทย! <br /> ยินดีต้อนรับ!
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="userBox">
          <div className="userImg">
            <img src="./imges/4.jpg" alt="Channel Logo" />
          </div>
          <div className='detailUser'>
            <div className="userName">FoLk</div>
            <div className='userAdd'>@Folkke1234</div>
          </div>
        </div>
      </div>
      
      <div className='containerBox'>
        <div className='comment_box'>
          <input
            className='inputText'
            type="text"
            value={commentInput}
            onChange={handleInputChange}
            placeholder="พิมพ์ข้อความของคุณที่นี่"
          />
          <button className='btnSubmit' onClick={submitComment}>ส่ง</button>
        </div>
        <div id="commentOutput">
          {comments.map((comment, index) => (
            <div key={index} className='comment' ref={index === comments.length - 1 ? latestCommentRef : null}>
              {comment}
            </div>
          ))}
        </div>
        <div className='chat_text'>Chat</div>
      </div>
    </div>
  );
}

export default LivePage;

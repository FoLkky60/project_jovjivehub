import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LivePage.css';

function LivePage({ apiKey }) {
  const [comment, setComment] = useState('');
  const [submittedComments, setSubmittedComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      const newComment = {
        text: comment,
        user: 'Guest', // Example username, replace this with actual user data
        profileImage: '/imges/1.jpg' // Example profile image URL
      };
      setSubmittedComments([...submittedComments, newComment]);
      setComment('');
    }
  };

  const positions = [
    [13.736717, 100.523186],
    [13.724894, 100.493025],
    [13.758703, 100.534437]
  ];

  const [commentButton,setCommentButton] = useState('CommentBox')

  return (
    <div>
      <div className='maps'>
          <MapContainer
            center={[13.736717, 100.523186]}
            zoom={13}
            style={{ height: '50vh', width: '88vw' ,left:'180px' }}
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
          <div className='WarperRun'>
          <div className='runDistance'>
            <p>30 kg</p>
          </div>
        </div>
          </MapContainer>
        
          

      </div>

      

      <div className='comment-section'>
        <form id='CommentForm' onSubmit={handleSubmitComment}>
          {submittedComments.length > 0 && (
            <div className="submitted-comments">
              {submittedComments.map((submittedComment, index) => (
                <div key={index} className="comment">
                  <img src={submittedComment.profileImage} alt="Profile" className="comment-profile" />
                  <div className="comment-text">
                    <strong>{submittedComment.user}</strong>: {submittedComment.text}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className='areatext'>
            <input
              className='InputBox'
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
            />
            <button type="submit">
              Send
            </button>
          </div>
        </form>
      </div>

    </div>
    
    
  );
}

export default LivePage;

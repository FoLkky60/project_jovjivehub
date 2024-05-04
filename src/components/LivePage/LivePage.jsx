import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LivePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function LivePage({ apiKey }) {
  const [comment, setComment] = useState('');
  const [submittedComments, setSubmittedComments] = useState([]);


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      setSubmittedComments([...submittedComments, comment]);
      setComment('');
    }
  };

  const positions = [
    [13.736717, 100.523186],
    [13.724894, 100.493025],
    [13.758703, 100.534437]
  ];
  
  const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

  const [commentButton,setCommentButton] = useState('CommentBox')

  return (
    
    <div className='maps'>
      
      <MapContainer
        center={[13.736717, 100.523186]}
        zoom={13}
        style={{ height: '50vh', width: '50vw' ,left:'180px' }}
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

      <div className='ButtonBox'>
          <button onClick={() => setCommentButton('comment-section')}>Chat</button>

      </div>


      <div className={commentButton}>
        
        <form id='CommentForm' onSubmit={handleSubmitComment}>
        {submittedComments.length > 0 && (
          <div className="submitted-comments">
            <div>
              {submittedComments.map((submittedComment, index) => (
                <div key={index}>{submittedComment}</div>
              ))}
            </div>
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
          <button onClick={() => setCommentButton('CommentBox')}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default LivePage;


import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./LivePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LivePage({ apiKey }) {
  const [comment, setComment] = useState("");
  const [submittedComments, setSubmittedComments] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [positions, setPositions] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [currentPosition, setCurrentPosition] = useState([
    13.736717, 100.523186,
  ]);

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

  // const positions = [
  //   [13.736717, 100.523186],
  //   [13.724894, 100.493025],
  //   [13.758703, 100.534437]
  // ];
  
  const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]
const limeOptions = { color: 'blue' }

  const [commentButton, setCommentButton] = useState("CommentBox");

  const fetchCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setPositions((prevPositions) => [
          ...prevPositions,
          [latitude, longitude],
        ]);

        setCurrentPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error occurred while fetching position:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const startTracking = () => {
    if (!isTracking) {
      const id = setInterval(fetchCurrentPosition, 2000); // Fetch position every 1 second
      setIntervalId(id);
      setIsTracking(true);
    }
  };

  const stopTracking = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsTracking(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  function UpdateMapCenter() {
    const map = useMap();
    map.flyTo(currentPosition, map.getZoom());
    return null; 
  }
  return (
    <div className="maps">
     
        <div  style={{ position: "absolute", zIndex: 999, left: "100px" }}>
        <button className="trackBox" onClick={isTracking ? stopTracking : startTracking}>
          {isTracking ? "Stop Tracking" : "Start Tracking"}
        </button>
        {/* <ul>
          {positions.map((pos, index) => (
            <li key={index}>
              Latitude: {pos[0]}, Longitude: {pos[1]}
            </li>
          ))}
        </ul> */}
      </div>

      <MapContainer
        className="mapContainer"
        center={currentPosition}
        zoom={13}
        
        zoomControl={false}
      >
        <UpdateMapCenter />

        <TileLayer
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?apiKey=${apiKey}`}
        />
        {positions.map((position, index) => (
          <Marker key={index} position={position}>
            <Popup>
              Latitude: {position[0]}, Longitude: {position[1]}
            </Popup>
          </Marker>
))}
        <Polyline pathOptions={limeOptions} positions={positions} />
      </MapContainer>

   
      

      <div className='comment-section'>
        <form id='CommentForm' onSubmit={handleSubmitComment}>
          {submittedComments.length > 0 && (
            <div className="submitted-comments">
              {submittedComments.map((submittedComment, index) => (
                <div key={index} className="comment">
                  <img src={submittedComment.profileImage} alt="Profile" className="comment-profile" />
                <div className="comment-text">
                    <div>{submittedComment.text}</div>
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

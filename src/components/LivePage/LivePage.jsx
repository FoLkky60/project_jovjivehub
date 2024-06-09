import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./LivePage.css";
import axios from "axios"; // Import axios
import { useLocation } from "react-router-dom";
import L from "leaflet";

function LivePage({ apiKey }) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const latestCommentRef = useRef(null);
  const [onwPostData, setOwmPostData] = useState(null);

  const customIcon = L.icon({
    iconUrl: "/imges/prof.png",
    iconSize: [38, 38], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = query.get("id");
        // console.log(id);
        const response = await axios.get(
          "http://localhost:5001/api/getPostDataByID",
          {
            params: { pid: id },
            headers: { "Content-Type": "application/json" },
          }
        );
        setOwmPostData(response.data.postData); // Set the data correctly
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log(onwPostData);

  const handleInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const submitComment = () => {
    if (commentInput.trim() !== "") {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  useEffect(() => {
    if (latestCommentRef.current) {
      latestCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const positions = [
    [13.736717, 100.523186],
    [13.724894, 100.493025],
    [13.758703, 100.534437],
  ];

  return (
    <>
    <div className="mapContainer">
      <div className="maps">
        <MapContainer
          className="MapBox"
          center={[13.736717, 100.523186]}
          zoom={13}
          zoomControl={false}
        >
          {onwPostData && (
            <div className="roomName">
              <div className="textRoom">{onwPostData.liveName}</div>
            </div>
          )}
          <TileLayer
            url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          />
          {positions.map((position, index) => (
            <Marker key={index} position={position} icon={customIcon}>
              <Popup>
                ประเทศไทย! <br /> ยินดีต้อนรับ!
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {onwPostData && (
          <div className="userBox">
            <div className="userImg">
              <img src={onwPostData.channelLogo} alt="Channel Logo" />
            </div>
            <div className="detailUser">
              <div className="userName">{onwPostData.creatorName}</div>
              <div className="userAdd">@{onwPostData.creatorName}</div>
            </div>
          </div>
        )}
      </div>

      <div className="containerBox">
        <div className="comment_box">
          <input
            className="inputText"
            type="text"
            value={commentInput}
            onChange={handleInputChange}
            placeholder="พิมพ์ข้อความของคุณที่นี่"
          />
          <button className="btnSubmit" onClick={submitComment}>
            ส่ง
          </button>
        </div>
        <div id="commentOutput">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="comment"
              ref={index === comments.length - 1 ? latestCommentRef : null}
            >
              {comment}
            </div>
          ))}
        </div>
        <div className="chat_text">Chat</div>
      </div>
      
    </div>
    <div className="leaveRoom">
        <button className="leavebtn">Leave Room</button>
      </div>
    </>
    
    
  );
}

export default LivePage;

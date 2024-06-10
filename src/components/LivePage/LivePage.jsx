import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./LivePage.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import L from "leaflet";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function LivePage({ apiKey }) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const latestCommentRef = useRef(null);
  const [onwPostData, setOwmPostData] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);
  const navigate = useNavigate();

  const customIcon = (iconUrl) =>
    L.icon({
      iconUrl: iconUrl || "/imges/prof.png",
      iconSize: [38, 38],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = query.get("id");
        const response = await axios.get(
          "http://localhost:5001/api/getPostDataByID",
          {
            params: { pid: id },
            headers: { "Content-Type": "application/json" },
          }
        );
        setOwmPostData(response.data.postData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        try {
          const pid = query.get("id");
          const uid = cookies.get("UID");
          await axios.post("http://localhost:5001/api/saveUserLocation", {
            userId: uid,
            latitude,
            longitude,
            roomId: pid,
          });
        } catch (error) {
          console.error("Error saving user location:", error);
        }

        try {
          const pid = query.get("id");
          const response = await axios.get(
            "http://localhost:5001/api/getOtherUsersLocations",
            {
              params: { roomId: pid },
              headers: { "Content-Type": "application/json" },
            }
          );
          setOtherUsers(response.data.users);
        } catch (error) {
          console.error("Error fetching other users' locations:", error);
        }
      });
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const id = query.get("id");
        const response = await axios.get(
          "http://localhost:5001/api/getContentCommentByPost",
          {
            params: { postId: id },
          }
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleInputChange = (event) => {
    setCommentInput(event.target.value);
  };

  const submitComment = async () => {
    if (commentInput.trim() !== "") {
      try {
        const id = query.get("id");
        const uid = cookies.get("UID");
        const response = await axios.post(
          "http://localhost:5001/api/addContentComment",
          {
            postId: id,
            userId: uid,
            text: commentInput,
          }
        );
        setComments([...comments, response.data]);
        setCommentInput("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  };

  useEffect(() => {
    if (latestCommentRef.current) {
      latestCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]);

  const leaveRoom = async () => {
    try {
      const pid = query.get("id");
      const uid = cookies.get("UID");
      await axios.post("http://localhost:5001/api/leaveRoom", {
        userId: uid,
        roomId: pid,
      });
      // Redirect to another page after leaving the room
      navigate("/");
    } catch (error) {
      console.error("Error leaving the room:", error);
    }
  };

  return (
    <>
      <div className="mapContainer">
        <div className="maps">
          <MapContainer
            className="MapBox"
            center={userLocation || [13.736717, 100.523186]}
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
            {otherUsers.map((user, index) => (
              <Marker
                key={index}
                position={[user.location.latitude, user.location.longitude]}
                icon={customIcon(user.memberId.profilePic)}
              >
                <Popup>{user.memberId.username}</Popup>
              </Marker>
            ))}
          </MapContainer>
          {onwPostData && (
            <div className="userBox">
              <div className="userImg">
                <img src={onwPostData.OnwerId.profilePic} alt="Channel Logo" />
              </div>
              <div className="detailUser">
                <div className="userName">{onwPostData.OnwerId.username}</div>
                <div className="userAdd">@{onwPostData.OnwerId.username}</div>
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
            <div className="btnSubmit" onClick={submitComment}>
              <span className="material-symbols-outlined">send</span>
            </div>
          </div>
          <div id="commentOutput">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="comment"
                ref={index === comments.length - 1 ? latestCommentRef : null}
              >
                <div className="commentTextDetail">
                  <div className="commentText">{comment.userId.username}:</div>
                  <div className="commentText">{comment.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat_text">Chat</div>
        </div>
      </div>

      {onwPostData && (
        <div className="leaveRoom">
          {onwPostData.OnwerId._id == cookies.get("UID") && (
            <button className="leavebtn" onClick={leaveRoom}>Leave Room</button>
          )}
        </div>
      )}
    </>
  );
}

export default LivePage;



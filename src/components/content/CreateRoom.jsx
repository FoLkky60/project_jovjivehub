import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import "./CreateRoom.css";

const CreateRoom = () => {
  const [liveName, setLiveName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [viewers, setViewers] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [channelLogo, setChannelLogo] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cookie = new Cookies();
      const uid = cookie.get("UID");
      if (uid) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/getUserDataByID",
            {
              params: { UID: uid },
              headers: { "Content-Type": "application/json" },
            }
          );
          setUserData(response.data.userDate);
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, [showPopup]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userData.username);
    const formData = new FormData();
    formData.append("liveName", liveName);
    formData.append("creatorName", userData.username);
    formData.append("viewers", 0);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (channelLogo) formData.append("channelLogo", channelLogo);

    try {
      const response = await axios.post(
        "http://localhost:5000/content",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Content created successfully:", response.data);
      // Reset form fields
      setLiveName("");
      setCreatorName("");
      setViewers("");
      setThumbnail(null);
      setChannelLogo(null);
      setShowPopup(false);
    } catch (error) {
      console.log("Error creating content:", error);
    }
  };

  return (
    <div className="create-room-container">
      <button className="floating-button" onClick={() => setShowPopup(true)}>
        +
      </button>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-contents" onClick={(e) => e.stopPropagation()}>
            <form className="formHeader" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="liveName">Room Name:</label>
                <input
                  type="text"
                  id="liveName"
                  value={liveName}
                  onChange={(e) => setLiveName(e.target.value)}
                  required
                />

                {/* <label htmlFor="creatorName">Creator Name:</label>
                <input
                  type="text"
                  id="creatorName"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  required
                /> */}

                {/* <label htmlFor="viewers">Viewers:</label>
                <input
                  type="number"
                  id="viewers"
                  value={viewers}
                  onChange={(e) => setViewers(e.target.value)}
                  required
                /> */}

                <label htmlFor="thumbnail">Room Picture: </label>
                <input
                  type="file"
                  id="thumbnail"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />

                {/* <label htmlFor="channelLogo">Channel Logo:</label>
                <input
                  type="file"
                  id="channelLogo"
                  onChange={(e) => setChannelLogo(e.target.files[0])}
                /> */}
              </div>

              <button type="submit">Create Content</button>
              <button
                type="button"
                className="close-button"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;

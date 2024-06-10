import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/nav/MyNavbar";
import "./Profile.css";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

function Profile() {
  const [name, setName] = useState(
    localStorage.getItem("profileName") || "Johndee"
  );
  const [image, setImage] = useState(
    localStorage.getItem("profileImage") || "./imges/prof.png"
  );
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState(null);

  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileImage", image);
  }, [name, image]);

  useEffect(() => {
    const fetchData = async () => {
      const uid = cookies.get("UID");
      if (uid) {
        try {
          const response = await axios.get(
            "http://localhost:5001/api/getUserDataByID",
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
  }, []);

  const handleNameChange = () => {
    setIsNameModalVisible(true);
  };

  const handleNameConfirm = async () => {
    if (newName !== null && newName !== "") {
      setName(newName);

      const uid = cookies.get("UID");
      if (uid) {
        try {
          await axios.post("http://localhost:5001/api/updateUsername", {
            uid,
            newUsername: newName,
          });
        } catch (error) {
          console.error("Error updating username:", error);
        }
      }
      setIsNameModalVisible(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImageFile(file); // Store the file in state
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setIsImageModalVisible(true);
    }
  };

  const handleImageConfirm = async () => {
    const uid = cookies.get("UID");
    if (uid && newImageFile) {
      const formData = new FormData();
      formData.append("profilePic", newImageFile);
      formData.append("uid", uid);
      try {
        await axios.post(
          "http://localhost:5001/api/updateProfilePic",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsImageModalVisible(false);
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      {userData && (
        <div className="profile">
          <div className="bgProfile">
            <img
              src={userData.profilePic}
              alt="Profile Picture"
              className="profile-picture"
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <div className="name-profile">
              <div className="profile-name" onClick={handleNameChange}>
                {userData.username}
              </div>
            </div>
            <div className="profile-username">@{userData.username}</div>
          </div>
        </div>
      )}

      {/* Display placeholder text
      <div className="comments">
        <p>No comments available.</p>
      </div> */}

      {/* Name Change Modal */}
      {isNameModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Change Name</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new name"
            />
            <button onClick={handleNameConfirm}>Confirm</button>
            <button onClick={() => setIsNameModalVisible(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Image Change Modal */}
      {isImageModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Change Profile Picture</h2>
            <img src={image} alt="New Profile Preview" className="profile-preview" />
            <button onClick={handleImageConfirm}>Confirm</button>
            <button onClick={() => setIsImageModalVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;

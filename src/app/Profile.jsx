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
  const [imageFile, setImageFile] = useState(null); // New state to store the image file
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState(null);

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

  const handleNameChange = async () => {
    const newName = prompt("กรุณากรอกชื่อใหม่");
    if (newName !== null && newName !== "") {
      setName(newName);

      const uid = cookies.get("UID");
      if (uid) {
        try {
          await axios.post("http://localhost:5001/api/user/updateUsername", {
            uid,
            newUsername: newName,
          });
        } catch (error) {
          console.error("Error updating username:", error);
        }
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store the file in state
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    const uid = cookies.get("UID");
    if (uid && imageFile) {
      const formData = new FormData();
      formData.append("profilePic", imageFile);
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

          {/* Button to upload the selected image */}
          <button onClick={handleImageUpload}>Upload Profile Picture</button>
        </div>
      )}

      {/* Display placeholder text */}
      <div className="comments">
        <p>No comments available.</p>
      </div>
    </>
  );
}

export default Profile;

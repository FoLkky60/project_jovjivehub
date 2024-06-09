import React, { useState, useEffect } from 'react';
import '../app/Profile.css';
import Navbar from '../components/nav/MyNavbar';

function Profile() {
  const [name, setName] = useState(localStorage.getItem('profileName') || "Johndee");
  const [image, setImage] = useState(localStorage.getItem('profileImage') || "./imges/prof.png");

  useEffect(() => {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileImage', image);
  }, [name, image]);

  const handleNameChange = () => {
    const newName = prompt("กรุณากรอกชื่อใหม่");
    if (newName !== null && newName !== "") {
      setName(newName);
    }
  };

  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Navbar/>
      <div className="profile">
        <div className='bgProfile'>
          <img src={image} alt="Profile Picture" className="profile-picture" onClick={() => document.getElementById('fileInput').click()} />
          <input type="file" id="fileInput" accept="image/*" onChange={handleImageChange} style={{display: "none"}} />
       
        <div className='name-profile'>
          <div className="profile-name" onClick={handleNameChange}>{name}</div>
        </div>
        <div className="profile-username">@test12345</div> 
        </div>
      </div>
    </>
  );
}

export default Profile;

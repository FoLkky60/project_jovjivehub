import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for toggling Navbar
  const [userData, setUserData] = useState(null); // State for user data
    
  // Function for handling hamburger menu toggle
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cookie = new Cookies();
      const uid = cookie.get("UID");
      if (uid) {
        try {
          const response = await axios.get("http://localhost:5000/api/getUserDataByID", {
            params: { UID: uid },
            headers: { "Content-Type": "application/json" },
          });
          setUserData(response.data.userDate);
          console.log(response.data.userDate);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <section id="nav">
      <div className="start">
        <div className="hamburger" onClick={handleToggle}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div className="logo">
          <h2 id="first-text">
            JogJive<span id="last-text">Hub</span>
          </h2>
        </div>
      </div>

      {/* Show Navbar when isOpen is true */}
      {isOpen && (
        <nav className="navbar">
          <ul id="nav">
            <div className="side-main">
              <div className="side-item">
                <div className="icon">
                  <Link to="/Home">
                    <span className="material-symbols-outlined">home</span>
                  </Link>
                </div>
                <div className="side-text">Home</div>
              </div>
            </div>
            <div className="side-main">
              <div className="side-item">
                <div className="icon">
                  <span className="material-symbols-outlined">account_circle</span>
                </div>
                <div className="side-text">Profile</div>
              </div>
            </div>
            <div className="side-main">
              <div className="side-item">
                <div className="icon">
                  <Link to="/Calender">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </Link>
                </div>
                <div className="side-text">Calendar</div>
              </div>
            </div>
            <div className="side-main">
              <div className="side-item">
                <div className="icon">
                  <span className="material-symbols-outlined">monetization_on</span>
                </div>
                <div className="side-text">Coin</div>
              </div>
            </div>
            <div className="side-main">
              <div className="side-item">
                <div className="icon">
                  <Link to="/HostLive">
                    <span className="material-symbols-outlined">live_tv</span>
                  </Link>
                </div>
                <div className="side-text">Live</div>
              </div>
            </div>
            <div className="side-main">
              <div className="side-item">
                <div className="icon">
                  <span className="material-symbols-outlined">help</span>
                </div>
                <div className="side-text">Help</div>
              </div>
            </div>
            <div className="side-main">
              <div className="side-item">
                <div className="icon">
                  <span className="material-symbols-outlined">logout</span>
                </div>
                <div className="side-text">Logout</div>
              </div>
            </div>
          </ul>
        </nav>
      )}

      <div className="end">
        <div className="end-item">
          <Link to="/Login">
            {userData ? userData.username : ""} 
            <span className="material-symbols-outlined">person</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Navbar;

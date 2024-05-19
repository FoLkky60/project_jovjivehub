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
        <div className='nav'>
            <div className='Start'>
                <div className='Hamberger' onClick={handleToggle}>
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </div>
                <div className='logo'>
                    <h2 id='frist-taxt'>JogJive<span id='last-taxt'>Hub</span></h2>
                </div>
            </div>
            
            {/* แสดง Navbar เมื่อ isOpen เป็น true */}
            {isOpen && (
                <nav className='navbar'>
                    <div id='Nav'>
                        <div className='side-main'>
                            <div className='side-item'>
                                <div className='icon'>
                                    <Link to="/Home">
                                        <span className="material-symbols-outlined">home</span>
                                    </Link>
                                </div>
                                <div className='side-taxt'>Home</div>
                            </div>
                        </div>
                        <div className='side-main'>
                            <div className='side-item'>
                                <div className='icon'>
                                    <span className="material-symbols-outlined">account_circle</span>
                                </div>
                                <div className='side-taxt'>Profile</div>
                            </div>
                        </div>
                        <div className='side-main'>
                            <div className='side-item'>
                                <div className='icon'>
                                    <Link to="/Calender">
                                        <span className="material-symbols-outlined">calendar_month</span>
                                    </Link>
                                </div>
                                <div className='side-taxt'>Calender</div>
                            </div>
                        </div>
                        <div className='side-main'>
                            <div className='side-item'>
                                <div className='icon'>
                                    <Link to="/HostLive">
                                        <span className="material-symbols-outlined">live_tv</span>
                                    </Link>
                                </div>
                                <div className='side-taxt'>Live</div>
                            </div>
                        </div>
                        
                    </div>
                </nav>
            )}

            <div className='End'>
                <div className='end-item'>
                    <Link to="/Login">
                        <span className="material-symbols-outlined">
                            person
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

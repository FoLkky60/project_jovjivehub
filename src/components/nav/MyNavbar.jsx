import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import axios from "axios";

function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth = 790) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cookie = new Cookies();
      const uid = cookie.get("UID");
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
          setLogin(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, [isLogin]);

  const handleLogout = () => {
    const cookie = new Cookies();
    cookie.remove("UID");
    console.log("logout");
    setLogin(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="nav">
      <div className="Start">
        <div className="Hamberger" onClick={handleToggle}>
          <span className="material-symbols-outlined">menu</span>
        </div>
        <div className="logo">
          <h2 id="frist-taxt">
            JogJive<span id="last-taxt">Hub</span>
          </h2>
        </div>
      </div>

      {isOpen && (
        <nav className="navbar">
          <div id="Nav">
            <div className="side-main">
            <Link to="/">
              <div className="side-item">
                <div className="icon">
                  
                    <span className="material-symbols-outlined">home</span>
                 
                </div>
                <div className="side-taxt">Home</div>
              </div>
              </Link>
            </div>
            <div className="side-main">
            <Link to="/feed">
              <div className="side-item">
                <div className="icon">
                  
                    <span className="material-symbols-outlined">chat_bubble</span>
                  
                </div>
                <div className="side-taxt">Feed</div>
              </div>
              </Link>
            </div>
            <div className="side-main">
            <Link to="/Calender">
              <div className="side-item">
                <div className="icon">
                    <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <div className="side-taxt">Calender</div>
              </div>
              </Link>
            </div>
          </div>
        </nav>
      )}

      <div className="End">
        
        <div className="end-item">
        {/* <Link to="/profile">
          <span className="material-symbols-outlined">calendar_month</span>
        </Link> */}
          {isLogin ? (
            <div className="side-main" id="logout" >
              <div className="endSideitem">
                {/* <p>{userData.username}</p> */}
                <div className="icon">
                  <Link to="/profile">
                    <span className="material-symbols-outlined">person</span>
                  </Link>
                 
                </div>
                <div onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                  </div>
              </div>
            </div>
          ) : (
            <Link to="/Login">
              <span className="material-symbols-outlined">person</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import React, {useState,useEffect }from "react";
import Navbar from "../components/nav/MyNavbar";
import Content from "../components/content/Content";
import "./ContentPage.css";
import CreateRoom from "../components/content/CreateRoom";
import axios from "axios";

function ContentPage() {
  const [contents, setContents] = useState([]);
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/getAllContent');
        setContents(response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContents();
  }, [contents]);

  // cnsole.log(contents);

  return (
    <>
      <Navbar />
      <div className="feed-head">
        <div className="welcomeTaxt">Welcome to Jogjivehub</div>
      </div>
   
      <div className="Live_text">Live</div>
      <CreateRoom />
      <div className="conTainerForm">
        <div className="itemCon">
          {contents.map((data, index) => (
            <Content
              key={index}
              id = {data._id}
              thumbnail={data.thumbnail}
              channelLogo={data.OnwerId.profilePic || "./imges/prof.png" }
              liveName={data.liveName}
              creatorName={data.OnwerId.username}
              viewers={data.viewers}
            />
          ))}
        </div>
      </div>
      <footer className="foot">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About Us</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor consequat magna, nec tincidunt turpis dictum quis.</p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: jogjive@gmail.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
        {/* <div className="footer-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 YourWebsite. All rights reserved.</p>
      </div>
    </footer>

    </>
  );
}

export default ContentPage;

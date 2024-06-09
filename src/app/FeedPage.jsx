import React from 'react'
import Feed from '../components/feed/Feed'
import Navbar from '../components/nav/MyNavbar'

function FeedPage() {
  return (
    <>
    <Navbar/>
    <div className="feed-head"> Anonymous Live Feed</div>
    <Feed/>
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
  )
}

export default FeedPage
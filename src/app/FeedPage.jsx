import React from 'react'
import Feed from '../components/feed/Feed'
import Navbar from '../components/nav/MyNavbar'


function FeedPage() {
  return (
    <>
    <Navbar/>
    <div className="feed-head"> 
    <div className='welcomeTaxt'>Anonymous Live Feed</div>
    </div>
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
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 YourWebsite. All rights reserved.</p>
      </div>
    </footer>
    </>
  )
}

export default FeedPage
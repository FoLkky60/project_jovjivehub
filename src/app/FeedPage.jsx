import React from 'react'
import Feed from '../components/feed/Feed'
import Navbar from '../components/nav/MyNavbar'

function FeedPage() {
  return (
    <>
    <Navbar/>
    <div className="feed-head"> Anonymous <br/> Live Feed</div>
    <Feed/>
    </>
  )
}

export default FeedPage
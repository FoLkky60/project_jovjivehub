import React from 'react'
import Navbar from '../components/nav/Navbar'
import LivePage from '../components/LivePage/LivePage'
import Sidebar from '../components/sidebar/Sidebar'

function HostLive() {
  return (
    <section id='main-layout'>

          <Navbar></Navbar>
          {/* <Sidebar></Sidebar> */}
          <LivePage></LivePage>
         
        </section>
    
  )
}

export default HostLive
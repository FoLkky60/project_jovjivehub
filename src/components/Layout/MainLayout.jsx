import React from 'react'
import Navbar from '../nav/Navbar'
import Content from '../content/Content'
import Sidebar from '../sidebar/Sidebar'
import Event from '../event/Event'
// import Footer from '../footer/Footer'
import LivePage from '../LivePage/LivePage'





function MainLayout() {
  return (
    <section id='main-layout'>
      <Navbar></Navbar>
 
      <Content></Content>
     
     
    </section>
  
  )
}

export default MainLayout
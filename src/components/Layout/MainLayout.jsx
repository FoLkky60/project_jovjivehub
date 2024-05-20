import React from 'react'
import MyNavbar from '../nav/MyNavbar'
import Content from '../content/Content'
import Sidebar from '../sidebar/Sidebar'
import Event from '../event/Event'
// import Footer from '../footer/Footer'
import LivePage from '../LivePage/LivePage'





function MainLayout() {
  return (
    <section id='main-layout'>
      <MyNavbar></MyNavbar>
 
      <Content></Content>
     
     
    </section>
  
  )
}

export default MainLayout
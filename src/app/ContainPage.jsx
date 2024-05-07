import React from 'react'
import Navbar from '../components/nav/Navbar'
import Content from '../components/content/Content'
import Sidebar from '../components/sidebar/Sidebar'


function ContainPage() {
    return (
        <section id='main-layout'>

          <Navbar></Navbar>
          {/* <Sidebar></Sidebar> */}
      
          <Content></Content>
         
        </section>
      
      )
}

export default ContainPage
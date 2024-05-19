import React from 'react'
import './Content.css'

function Content() {
  return (

    <div id='the-card'>
        <div className='card'>
            <div className='thumb'>
                <img src="./imges/1.jpg" alt="Thumbnail" />
            </div>
            <div className='about'>
                <div className='Chanal'>
                    <img src="./imges/4.jpg" alt="Channel Logo" />
                </div>
                <div className='Detail-live'>
                    <div className='live-name'>เหงาจาง</div>
                    <div className='creater-name'>Folk</div>
                    <div className='view'>2380 viewers</div>
                </div>
            </div>
        </div>
        
    </div>

  )
}

export default Content
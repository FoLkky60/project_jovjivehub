import React from 'react'
import './Sidebar.css'

import { Link ,useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

function Sidebar() {
    const navigate = useNavigate();

    const HandleLogout =() =>{
        const cookie = new Cookies();
        cookie.remove("UID")
        console.log('logout');
        navigate('/' ,{replace: true})
    }
    
  return (
    <section id='side'>
         <div className='side-main'>
            <div className='side-item'>
                <div className='icon'>
                    <Link to="/Home">
                    <span class="material-symbols-outlined">
                        home
                    </span>

                    </Link>
                </div>
                <div className='side-taxt'>Home</div>
            </div>
        </div>
        <div className='side-main'>
            <div className='side-item'>
                <div className='icon'>
                <span class="material-symbols-outlined">
                    account_circle
                </span>
                </div>
                <div className='side-taxt'>Profile</div>
            </div>
        </div>
        <div className='side-main'>
            <div className='side-item'>
                <div className='icon'>
                    <Link to="/Calender">
                    <span class="material-symbols-outlined">
                    calendar_month
                </span>
                    </Link>
                
                </div>
                <div className='side-taxt'>Calender</div>
            </div>
        </div><div className='side-main'>
            <div className='side-item'>
                <div className='icon'>

                <span class="material-symbols-outlined">
                    monetization_on
                </span>

                </div>
                <div className='side-taxt'>Coin</div>
            </div>
        </div>
        <div className='side-main'>
            <div className='side-item'>
             
                <div className='icon'>
                <Link to="/HostLive">
                    <span  class="material-symbols-outlined">
                    live_tv
                    </span>
                </Link>
                    
                
                
                </div>
               
                
                <div className='side-taxt'>Live</div>
            </div>
        </div>
        <div className='side-main'>
            <div className='side-item'>
                <div className='icon'>
                <span class="material-symbols-outlined">
                    help
                </span>
                </div>
                <div className='side-taxt'>Help</div>
            </div>
        </div>

        <div className='side-main' id = "logout " onClick={HandleLogout}>
            <div className='side-item'>
                <div className='icon'>
                <span class="material-symbols-outlined">
                    logout
                </span>
                </div>
                <div className='side-taxt' >Logout</div>
            </div>
        </div>
        
    </section>
  )
}

export default Sidebar
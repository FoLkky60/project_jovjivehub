
import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'

function Navbar() {
    const [isOpen, setIsOpen] = useState(true); // State สำหรับเก็บสถานะของ Navbar

    // Function เมื่อคลิกที่ปุ่ม Hamburger
    const handleToggle = () => {
        setIsOpen(!isOpen); // สลับสถานะ isOpen
    };

    return (
        <section id='nav'>
            <div className='Start'>
                <div className='Hamberger' onClick={handleToggle}>
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                </div>
                <div className='logo'>
                    <h2 id='frist-taxt'>JogJive<span id='last-taxt'>Hub</span></h2>
                </div>
            </div>
            
            {/* แสดง Navbar เมื่อ isOpen เป็น true */}
            {isOpen && (
                <nav className='navbar'>
                    <ul id='Nav'>
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
                    <Link to="Calender">
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
                <div className='side-taxt'>Community</div>
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
        <div className='side-main'>
            <div className='side-item'>
                <div className='icon'>
                <span class="material-symbols-outlined">
                    logout
                </span>
                </div>
                <div className='side-taxt'>Logout</div>
            </div>
        </div>
                    </ul>
                </nav>
            )}

            <div className='End'>
                <div className='end-item'>
                    <Link to="/Login">
                    <span className="material-symbols-outlined">
                        person
                    </span>

                    </Link>
                    
                </div>
            </div>
        </section>
    );
}

export default Navbar;

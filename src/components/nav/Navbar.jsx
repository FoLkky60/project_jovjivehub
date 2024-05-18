import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(true); // State สำหรับเก็บสถานะของ Navbar

    // Function เมื่อคลิกที่ปุ่ม Hamburger
    const handleToggle = () => {
        setIsOpen(!isOpen); // สลับสถานะ isOpen
    };

    return (
        <div className='nav'>
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
                    <div id='Nav'>
                        <div className='side-main'>
                            <div className='side-item'>
                                <div className='icon'>
                                    <Link to="/Home">
                                        <span className="material-symbols-outlined">home</span>
                                    </Link>
                                </div>
                                <div className='side-taxt'>Home</div>
                            </div>
                        </div>
                        <div className='side-main'>
                            <div className='side-item'>
                                <div className='icon'>
                                    <span className="material-symbols-outlined">account_circle</span>
                                </div>
                                <div className='side-taxt'>Profile</div>
                            </div>
                        </div>
                        <div className='side-main'>
                            <div className='side-item'>
                                <div className='icon'>
                                    <Link to="/Calender">
                                        <span className="material-symbols-outlined">calendar_month</span>
                                    </Link>
                                </div>
                                <div className='side-taxt'>Calender</div>
                            </div>
                        </div>
                        <div className='side-main'>
                            <div className='side-item'>
                                <div className='icon'>
                                    <Link to="/HostLive">
                                        <span className="material-symbols-outlined">live_tv</span>
                                    </Link>
                                </div>
                                <div className='side-taxt'>Live</div>
                            </div>
                        </div>
                        
                    </div>
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
        </div>
    );
}

export default Navbar;

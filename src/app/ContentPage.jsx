import React from "react";
import Navbar from "../components/nav/MyNavbar";
import Content from "../components/content/Content";
import "./ContentPage.css";
import { Link, useNavigate } from "react-router-dom";

function ContentPage() {
  return (
    <>
      <Navbar></Navbar>

      <div className="Live_text">อีเว้นตอนนี้</div>
      <div className="conTainerForm">
        <div className="itemCon">
          <Link to='/HostLive'><Content></Content></Link>
          <Link to='/HostLive'><Content></Content></Link>
          <Link to='/HostLive'><Content></Content></Link>
          <Link to='/HostLive'><Content></Content></Link>
          <Link to='/HostLive'><Content></Content></Link>
          <Link to='/HostLive'><Content></Content></Link>
          <Link to='/HostLive'><Content></Content></Link>
          <Link to='/HostLive'><Content></Content></Link>
          <Link to='/HostLive'><Content></Content></Link>

        </div>
      </div>

      <footer className="foot">ig :jogjivehub_01</footer>
    </>
  );
}

export default ContentPage;

import React from "react";
import Navbar from "../components/nav/MyNavbar";
import Content from "../components/content/Content";
import "./ContentPage.css";

function ContentPage() {
  return (
    <>
      <Navbar></Navbar>

      <div className="Live_text">อีเว้นตอนนี้</div>
      <div className="conTainerForm">
        <div className="itemCon">
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
          <Content></Content>
        </div>
      </div>

      <footer className="foot">ig :jogjivehub_01</footer>
    </>
  );
}

export default ContentPage;

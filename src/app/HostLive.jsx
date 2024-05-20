import React from "react";
import Navbar from "../components/nav/MyNavbar";
import LivePage from "../components/LivePage/LivePage";

function HostLive() {
  return (
    <section id="main-layout">
      <Navbar></Navbar>

      <LivePage></LivePage>
    </section>
  );
}

export default HostLive;

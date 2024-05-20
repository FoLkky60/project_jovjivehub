import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Navbar from "../components/nav/MyNavbar";

const CalenderPage = () => {
  const events = [
    {
      title: "front",
      start: "2024-04-18",
      end: "2024-04-20",
      color: "#FF0000",
    },
    { title: "Back", start: "2024-04-20", end: "2024-04-20", color: "#00FF00" },
    { title: "UI", start: "2024-04-19", end: "2024-04-18", color: "#fff" },
    { title: "UX", start: "2024-04-28", end: "2024-04-29", color: "#888" },
    { title: "UI", start: "2024-04-29", end: "2024-04-18", color: "#fff" },
  ];

  return (
    <div className="App">
      <Navbar></Navbar>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default CalenderPage;

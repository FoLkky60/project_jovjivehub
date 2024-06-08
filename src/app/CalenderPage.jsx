import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "../components/nav/MyNavbar";
import '../app/CalenderPage.css'

const CalenderPage = () => {
  const [events, setEvents] = useState([
    {
      title: "front",
      start: "2024-04-18",
      end: "2024-04-20",
      color: "#FF0000",
      description: "Example Description 1" // เพิ่มคำอธิบายหรือข้อความที่ต้องการแสดง
    },
    { title: "Back", start: "2024-04-20", end: "2024-04-20", color: "#00FF00", description: "Example Description 2" },
    { title: "UI", start: "2024-04-19", end: "2024-04-18", color: "#fff", description: "Example Description 3" },
    { title: "UX", start: "2024-04-28", end: "2024-04-29", color: "#888", description: "Example Description 4" },
    { title: "UI", start: "2024-04-29", end: "2024-04-18", color: "#fff", description: "Example Description 5" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setPopupText(arg.dayEl.innerText); // ใช้ข้อความที่แสดงบนวันเป็นข้อความใน Popup
    setShowPopup(true);
  };

  const handleAddOrUpdateEvent = () => {
    setShowPopup(false);
    const title = popupText.trim();
    if (title) {
      const newEvent = { title, start: selectedDate, color: "#0000FF", description: "" };
      const updatedEvents = events.filter(event => event.start !== selectedDate);
      setEvents([...updatedEvents, newEvent]);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    
     
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventContent={renderEventContent} // ใช้ฟังก์ชัน renderEventContent เพื่อแสดงข้อความแสดงในวัน
        id='Calen'
      />
      {showPopup && (
        <div className="popup">
          <input
            type="text"
            value={popupText}
            onChange={(e) => setPopupText(e.target.value)}
            placeholder="กรุณาใส่ข้อความ"
          />
          <button onClick={handleAddOrUpdateEvent}>ตกลง</button>
        </div>
      )}

    </>
    
  );
};

// ฟังก์ชันสำหรับแสดงข้อความในวัน
const renderEventContent = (eventInfo) => {
  return (
    <div>
      <p>{eventInfo.timeText}</p>
      <p>{eventInfo.event.title}</p>
      <p>{eventInfo.event.extendedProps.description}</p> {/* แสดงคำอธิบายที่เพิ่มเติม */}
    </div>
  );
};

export default CalenderPage;

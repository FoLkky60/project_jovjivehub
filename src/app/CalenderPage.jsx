import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "../components/nav/MyNavbar";
import axios from "axios";
import "../app/CalenderPage.css";
import { Cookies } from "react-cookie";

// Utility function to get a random slice of an array
const getRandomSlice = (arr) => {
  const start = Math.floor(Math.random() * arr.length);
  const end = Math.floor(Math.random() * (arr.length - start)) + start;
  return arr.slice(start, end);
};

// Function to generate sample tasks
const generateSampleTasks = (tasks) =>
  tasks.map((task) => ({ task, done: false }));

// Function to generate a monthly exercise plan
const generateExercisePlan = () => {
  const exercisePlan = {};
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  const tasks = [
    ["Warm-up", "Stretching", "Run 3km", "Cool down", "Hydrate"],
    [
      "Warm-up",
      "Stretching",
      "Strength Training (Upper Body)",
      "Cool down",
      "Hydrate",
    ],
    ["Warm-up", "Stretching", "Run 5km", "Cool down", "Hydrate"],
    ["Warm-up", "Stretching", "Yoga", "Cool down", "Hydrate"],
    ["Rest Day"],
    ["Warm-up", "Stretching", "Run 3km", "Cool down", "Hydrate"],
    [
      "Warm-up",
      "Stretching",
      "Strength Training (Lower Body)",
      "Cool down",
      "Hydrate",
    ],
  ];

  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${year}-${month}-${i.toString().padStart(2, "0")}`;
    exercisePlan[date] = tasks[i % 7];
  }
  return exercisePlan;
};

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
  const [popupText, setPopupText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [toDoList, setToDoList] = useState(generateExercisePlan());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);

  const cookie = new Cookies();
  const uid = cookie.get("UID");

  useEffect(() => {
    if (selectedDate) {
      fetchTasksForDate(selectedDate);
    }
  }, [selectedDate]);

  const fetchTasksForDate = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/tasks/${uid}/${date}`
      );
      const tasks = response.data
        ? response.data.tasks
        : generateSampleTasks(toDoList[date]);
      setTasksForSelectedDate(tasks);
      setToDoList((prev) => ({ ...prev, [date]: tasks }));
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    fetchInitialEvents();
  }, []);

  const fetchInitialEvents = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate();
    const dates = Array.from(
      { length: day },
      (_, i) => `${year}-${month}-${(i + 1).toString().padStart(2, "0")}`
    );

    const events = await Promise.all(
      dates.map(async (date) => {
        const response = await axios.get(
          `http://localhost:5001/api/tasks/${uid}/${date}`
        );
        const tasks = response.data
          ? response.data.tasks
          : generateSampleTasks(toDoList[date]);
        const completedTasks = tasks.filter((task) => task.done).length;
        let backgroundColor = getBackgroundColor(completedTasks, tasks.length);

        return {
          title: `${completedTasks}/${tasks.length} tasks done`,
          start: date,
          backgroundColor,
          borderColor: backgroundColor,
        };
      })
    );

    setEvents(events);
  };

  const getBackgroundColor = (completedTasks, totalTasks) => {
    if (completedTasks === 0) return "#ff0000"; // Red
    else if (completedTasks < totalTasks) return "#ffa500"; // Orange
    else return "#00ff00"; // Green
  };

  const handleDateClick = (arg) => {
    const clickedDate = new Date(arg.dateStr);
    const currentDate = new Date();
    if (clickedDate.getDay() <= currentDate.getDay()) {
      setSelectedDate(arg.dateStr);
      console.log(events);
    }
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

  const handleTaskChange = async (taskIndex) => {
    const updatedTasks = tasksForSelectedDate.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    setTasksForSelectedDate(updatedTasks);
    setToDoList((prev) => ({ ...prev, [selectedDate]: updatedTasks }));
    await saveTasks(uid, selectedDate, updatedTasks);
    updateEventsForDate(selectedDate, updatedTasks);
  };

  const saveTasks = async (uid, date, tasks) => {
    try {
      await axios.post("http://localhost:5001/tasks", {
        userId: uid,
        date,
        tasks,
      });
    } catch (error) {
      console.error("Error saving tasks", error);
    }
  };

  const updateEventsForDate = (date, tasks) => {
    const completedTasks = tasks.filter((task) => task.done).length;
    const backgroundColor = getBackgroundColor(completedTasks, tasks.length);

    const updatedEvent = {
      title: `${completedTasks}/${tasks.length} tasks done`,
      start: date,
      backgroundColor,
      borderColor: backgroundColor,
    };

    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.start === date ? updatedEvent : event))
    );
  };

  const renderEventContent = (eventInfo) => (
    <>
      <div className="fc-event-title">{eventInfo.event.title}</div>
      <div className="fc-event-description">
        {eventInfo.event.extendedProps.description}
      </div>
    </>
  );

  const eventClassNames = (eventInfo) => {
    const [completedTasks] = eventInfo.event.title.split("/");
    if (completedTasks === "0") return "no-tasks-completed";
    else if (completedTasks < eventInfo.event.title.split("/")[1])
      return "some-tasks-completed";
    else return "all-tasks-completed";
  };

  
  const meeting = [
    {
      id: "a",
      title: "my event",
      start: "2024-06-03",
      backgroundColor: '#ff00ff',
    },
    {
      id: "b",
      title: "my event2",
      start: "2024-06-05",
      backgroundColor: '#ff00ff',
    },
  ];
  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[...events,...meeting]}
            dateClick={handleDateClick}
            eventContent={renderEventContent}
            eventClassNames={eventClassNames}
            id="Calen"
          />
        </div>
        <div className="todo-list">
          <h2>To-Do List for {selectedDate}</h2>
          <ul>
            {tasksForSelectedDate.map((task, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleTaskChange(index)}
                />
                {task.task}
              </li>
            ))}
          </ul>
        </div>
      </div>
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

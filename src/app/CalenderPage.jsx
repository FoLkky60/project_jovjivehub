import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "../components/nav/MyNavbar";
import axios from "axios";
import "../app/CalenderPage.css";
import { Cookies } from "react-cookie";

// Utility function to get a random slice of an array
function getRandomSlice(arr) {
  // Generate two random indices
  let start = Math.floor(Math.random() * arr.length);
  let end = Math.floor(Math.random() * (arr.length - start)) + start;

  // Return the slice from start to end (inclusive of start, exclusive of end)
  return arr.slice(start, end);
}

// Function to generate sample tasks with 'done' status set to false
const generateSampleRandomTasks = () => {
  const tasks = ["Warm-up", "Stretching", "Cool down", "Hydrate"];

  let randomSlice = getRandomSlice(tasks);
  return randomSlice.map((task) => ({ task, done: false }));
};

const generateSampleTasks = (tasks) => {
  return tasks.map((task) => ({ task, done: false }));
};

// Function to generate a monthly exercise plan
const generateExercisePlan = () => {
  const exercisePlan = {};
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

  // Predefined tasks for each day of the week
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

  // Assign tasks to each day of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${year}-${month}-${i.toString().padStart(2, "0")}`;
    exercisePlan[date] = tasks[i % 7];
  }
  return exercisePlan;
};

const CalenderPage = () => {
  // State variables
  const [events, setEvents] = useState([]); // List of calendar events
  const [showPopup, setShowPopup] = useState(false); // Popup visibility
  const [popupText, setPopupText] = useState(""); // Text input in the popup
  const [selectedDate, setSelectedDate] = useState(""); // Currently selected date
  const [toDoList, setToDoList] = useState(generateExercisePlan()); // To-do list for each date
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]); // Tasks for the selected date

  // Retrieve user ID from cookies
  const cookie = new Cookies();
  const uid = cookie.get("UID");

  // Fetch tasks when a date is selected
  useEffect(() => {
    if (selectedDate) {
      fetchTasksForDate(selectedDate);
    }
  }, [selectedDate]);

  // Fetch tasks for a specific date from the server or generate sample tasks
  const fetchTasksForDate = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks/${uid}/${date}`
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

  // Fetch initial events when the component mounts
  useEffect(() => {
    fetchInitialEvents();
  }, []);

  // Fetch initial events for the current month
  const fetchInitialEvents = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate();
    const dates = [];
    for (let i = 1; i <= day; i++) {
      dates.push(`${year}-${month}-${i.toString().padStart(2, "0")}`);
    }

    // Fetch events for each date in the current month
    const events = await Promise.all(
      dates.map(async (date) => {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/${uid}/${date}`
        );
        const tasks = response.data
          ? response.data.tasks
          : generateSampleTasks(toDoList[date]);
        const completedTasks = tasks.filter((task) => task.done).length;
        let backgroundColor;

        // Determine event background color based on task completion
        if (completedTasks === 0) backgroundColor = "#ff0000"; // Red
        else if (completedTasks < tasks.length)
          backgroundColor = "#ffa500"; // Orange
        else backgroundColor = "#00ff00"; // Green

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

  // Handle date click events in the calendar
  const handleDateClick = (arg) => {
    const clickedDate = new Date(arg.dateStr);
    const currentDate = new Date();
    // Allow selecting past and current dates only
    if (clickedDate <= currentDate) {
      setSelectedDate(arg.dateStr);
    }
  };

  // Handle adding or updating an event
  const handleAddOrUpdateEvent = () => {
    setShowPopup(false);
    const title = popupText.trim();
    if (title) {
      const newEvent = {
        title,
        start: selectedDate,
        color: "#0000FF",
        description: "",
      };
      const updatedEvents = events.filter(
        (event) => event.start !== selectedDate
      );
      setEvents([...updatedEvents, newEvent]);
    }
  };

  // Handle task completion status change
  const handleTaskChange = async (taskIndex) => {
    const updatedTasks = tasksForSelectedDate.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    setTasksForSelectedDate(updatedTasks);
    setToDoList({
      ...toDoList,
      [selectedDate]: updatedTasks,
    });
    await saveTasks(uid, selectedDate, updatedTasks);
    updateEventsForDate(selectedDate, updatedTasks);
  };

  // Save tasks to the server
  const saveTasks = async (uid, date, tasks) => {
    try {
      await axios.post("http://localhost:5000/tasks", {
        userId: uid,
        date,
        tasks,
      });
    } catch (error) {
      console.error("Error saving tasks", error);
    }
  };

  // Update events for a specific date based on task completion
  const updateEventsForDate = (date, tasks) => {
    const completedTasks = tasks.filter((task) => task.done).length;
    let backgroundColor;

    // Determine event background color based on task completion
    if (completedTasks === 0) backgroundColor = "#ff0000"; // Red
    else if (completedTasks < tasks.length)
      backgroundColor = "#ffa500"; // Orange
    else backgroundColor = "#00ff00"; // Green

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

  // Render custom content for calendar events
  const renderEventContent = (eventInfo) => {
    return (
      <>
        <div className="fc-event-title">{eventInfo.event.title}</div>
        <div className="fc-event-description">
          {eventInfo.event.extendedProps.description}
        </div>
      </>
    );
  };

  // Assign class names to events based on task completion
  const eventClassNames = (eventInfo) => {
    const completedTasks = eventInfo.event.title.split("/")[0];
    if (completedTasks === "0") return "no-tasks-completed";
    else if (completedTasks < eventInfo.event.title.split("/")[1])
      return "some-tasks-completed";
    else return "all-tasks-completed";
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
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

export default CalenderPage;

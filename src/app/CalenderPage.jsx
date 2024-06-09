import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "../components/nav/MyNavbar";
import axios from "axios";
import "../app/CalenderPage.css";
import { Cookies, useCookies } from "react-cookie";

Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

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

function transformData(data) {
  return data.map((item) => {
    return {
      id: item.postId._id,
      title:
        item.postId.text.capitalize() +
        " by ".capitalize() +
        item.postId.author.capitalize(),
      start: item.MeetdateTime,
      backgroundColor: "#ff00ff",
    };
  });
}

const CalenderPage = () => {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [toDoList, setToDoList] = useState(generateExercisePlan());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const [meeting, setMeeting] = useState([]);
  const [evnetmeeting, setEvnetMeeting] = useState([]);
  const [incompleteDays, setIncompleteDays] = useState(0);
  const [cookies, setCookie] = useCookies(["isEmailSended"]);
  const cookie = new Cookies();
  const uid = cookie.get("UID");

  const currentDateString = new Date().toISOString().split("T")[0];
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      fetchTasksForDate(selectedDate);
      setIsEditable(selectedDate === currentDateString);
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

  useEffect(() => {
    const checkIncompleteDays = async () => {
      const incompleteDaysCount = await calculateIncompleteDays();
      const today = new Date().toISOString().split("T")[0];
      const lastEmailSentDate = cookies.lastEmailSentDate;
      // console.log("Last email sent date:", lastEmailSentDate);
      // console.log("today:", today);

      if (incompleteDaysCount >= 4 && (!cookies.isEmailSended || lastEmailSentDate !== today)) {
        console.log("Incomplete days >= 4, sending email...");
        setCookie("isEmailSended", true, { path: "/" });
        setCookie("lastEmailSentDate", today, { path: "/" });
        notifyUser(uid, incompleteDaysCount);
        // Call your email notification function here
      } else if (incompleteDaysCount < 4 && cookies.isEmailSended) {
        console.log("Incomplete days < 4, resetting email sent status...");
        setCookie("isEmailSended", false, { path: "/" });
      }
    };
    checkIncompleteDays();
  }, [toDoList]);

  const fetchInitialEvents = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate();
    const dates = Array.from(
      { length: day },
      (_, i) => `${year}-${month}-${(i + 1).toString().padStart(2, "0")}`
    );

    if (uid) {
      try {
        const meetResponse = await axios.get(
          "http://localhost:5001/api/getUserMeeting",
          {
            params: { userId: uid },
            headers: { "Content-Type": "application/json" },
          }
        );
        const meets = meetResponse.data;
        setEvnetMeeting(transformData(meets));
        setMeeting(meets);
      } catch (error) {
        console.error("Error fetching user meeting:", error);
      }
    }

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
    const clickedDate = new Date(arg.date);
    const currentDate = new Date();
    if (clickedDate <= currentDate) {
      setSelectedDate(arg.dateStr);
    }
  };

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
      setEvents((prevEvents) =>
        prevEvents
          .filter((event) => event.start !== selectedDate)
          .concat(newEvent)
      );
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

    const incompleteDaysCount = await calculateIncompleteDays();
    setIncompleteDays(incompleteDaysCount);
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

  const calculateIncompleteDays = async () => {
    let count = 0;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");

    for (let i = 0; i < 4; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);
      const dateString = `${year}-${month}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      try {
        const response = await axios.get(
          `http://localhost:5001/api/tasks/${uid}/${dateString}`
        );
        const tasks = response.data ? response.data.tasks : [];
        const completedTasks = tasks.filter((task) => task.done).length;
        if (completedTasks === 0 && tasks.length > 0) {
          count++;
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    }

    return count;
  };

  const notifyUser = async (userId, incompleteDays) => {
    try {
      await axios.post("http://localhost:5001/api/checkTasks", {
        userId,
        incompleteDays,
      });
    } catch (error) {
      console.error("Error notifying user", error);
    }
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

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="calendar-container">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={[...events, ...evnetmeeting]}
            dateClick={handleDateClick}
            eventContent={renderEventContent}
            eventClassNames={eventClassNames}
            id="Calen"
          />
        </div>
        <div className="todo-list">
          <h2>To-Do List for {selectedDate}</h2>
          {selectedDate !== currentDateString && (
            <button onClick={() => setIsEditable(!isEditable)}>
              {isEditable ? "Disable Editing" : "Enable Editing"}
            </button>
          )}
          <ul>
            {tasksForSelectedDate.map((task, index) => (
              <li key={index}>
                {isEditable ? (
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleTaskChange(index)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={task.done}
                    readOnly
                  />
                )}
                {task.task}
              </li>
            ))}
          </ul>
          <div>
            {meeting && meeting.length > 0 && (
              <div className="meeting">
                <h2>Meeting</h2>
                <ul>
                  {meeting.map((meet, index) => (
                    <li key={index}>
                      <p>title:{meet.postId.text}</p>
                      <p>by:{meet.postId.author}</p>
                      <p>date :{meet.postId.dateTime}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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

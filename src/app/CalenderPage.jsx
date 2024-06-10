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
  return data.map((item) => ({
    id: item.postId._id,
    title: `${item.postId.text.capitalize()} by ${item.postId.author.capitalize()}`,
    start: item.MeetdateTime,
    backgroundColor: "#ff00ff",
  }));
}

const CalenderPage = () => {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [toDoList, setToDoList] = useState(generateExercisePlan());
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState([]);
  const [meeting, setMeeting] = useState([]);
  const [eventMeeting, setEventMeeting] = useState([]);
  const [incompleteDays, setIncompleteDays] = useState(0);
  const [cookies, setCookie] = useCookies(["isEmailSended"]);
  const cookie = new Cookies();
  const uid = cookie.get("UID");

  let a = new Date();
  const currentDateString = a.toISOString().split("T")[0];

  const [isEditable, setIsEditable] = useState(false);
  const [isshowPopup, setIsshowPopup] = useState(false);
  const [customTasks, setCustomTasks] = useState([]); // State for custom tasks
  const [myCustomTasks, setMyCustomTasks] = useState([]);
  const [myCustomEvents, setMyCustomEvents] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetchTasksForDate(selectedDate);
      fetchCustomTasksForDate(selectedDate);

      console.log(currentDateString);
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

  const fetchCustomTasksForDate = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/customTasks/${uid}/${date}`
      );
      const customTasks = response.data ? response.data.tasks : [];
      setMyCustomTasks(customTasks);
      setCustomTasks(customTasks.map((task) => task.task)); // Set custom tasks for the popup
    } catch (error) {
      console.error("Error fetching custom tasks", error);
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

      if (
        incompleteDaysCount >= 4 &&
        (!cookies.isEmailSended || lastEmailSentDate !== today)
      ) {
        setCookie("isEmailSended", true, { path: "/" });
        setCookie("lastEmailSentDate", today, { path: "/" });
        notifyUser(uid, incompleteDaysCount);
        // Call your email notification function here
      } else if (incompleteDaysCount < 4 && cookies.isEmailSended) {
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
    const datesFullmonth = Array.from(
      { length: day },
      (_, i) => `${year}-${month}-${(i + 1).toString().padStart(2, "0")}`
    );
    const daysInMonth = new Date(year, month, 0).getDate();

    const datesFullMonth = Array.from(
      { length: daysInMonth },
      (_, i) =>
        `${year}-${month.toString().padStart(2, "0")}-${(i + 1)
          .toString()
          .padStart(2, "0")}`
    );

    // console.log(datesFullMonth);
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
        setEventMeeting(transformData(meets));
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

    // Fetch custom tasks and add them to events
    const customEventsPromises = datesFullMonth.map(async (date) => {
      const response = await axios.get(
        `http://localhost:5001/api/customTasks/${uid}/${date}`
      );
      const customTasks = response.data ? response.data.tasks : [];
      if (customTasks.length > 0) {
        return {
          title: `Custom Event: ${customTasks.length} tasks`,
          start: date,
          color: "#0000FF",
          // description: customTasks.map((task) => task.task).join(", "),
        };
      }
      return null;
    });

    const customEvents = (await Promise.all(customEventsPromises)).filter(
      (event) => event !== null
    );
    console.log(customEvents);
    setMyCustomEvents(customEvents);
    setEvents([...events]);
  };

  const getBackgroundColor = (completedTasks, totalTasks) => {
    if (completedTasks === 0) return "#ff0000"; // Red
    else if (completedTasks < totalTasks) return "#ffa500"; // Orange
    else return "#00ff00"; // Green
  };

  const handleDateClick = (arg) => {
    const clickedDate = new Date(arg.date);
    const currentDate = new Date();
    console.log(isshowPopup);
    if (clickedDate <= currentDate) {
      setSelectedDate(arg.dateStr);
    } else if (clickedDate > currentDate) {
      setSelectedDate(arg.dateStr);
      if (isshowPopup) {
        setShowPopup(true);
        console.log(showPopup);
      }
    }
  };

  const handleAddOrUpdateEvent = async () => {
    setShowPopup(false);
    if (customTasks.length > 0) {
      const newEvent = {
        title: `Custom Event`,
        start: selectedDate,
        color: "#0000FF",
        description: customTasks.join(", "), // Join tasks as description
      };
      setEvents((prevEvents) => [
        ...prevEvents.filter((event) => event.start !== selectedDate),
        newEvent,
      ]);
      const newCustomTasks = generateSampleTasks(customTasks);
      setMyCustomTasks(newCustomTasks);
      await saveCustomTasks(uid, selectedDate, newCustomTasks);
      setCustomTasks([]); // Clear custom tasks after adding
      setIsshowPopup(false);
    }
  };

  const handleAddTask = () => {
    const task = popupText.trim();
    if (task) {
      setCustomTasks([...customTasks, task]);
      setPopupText(""); // Clear input after adding
    }
  };

  const handleDeleteTask = async (index) => {
    const updatedTasks = customTasks.filter((_, i) => i !== index);
    setCustomTasks(updatedTasks);
    setMyCustomTasks(updatedTasks.map((task) => ({ task, done: false }))); // Update myCustomTasks state
    await saveCustomTasks(
      uid,
      selectedDate,
      updatedTasks.map((task) => ({ task, done: false }))
    ); // Save updated tasks to backend
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

  const handleCustomTaskChange = async (taskIndex) => {
    const updatedTasks = myCustomTasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    setMyCustomTasks(updatedTasks);
    await saveCustomTasks(uid, selectedDate, updatedTasks);
    updateCustomEventsForDate(selectedDate, updatedTasks);
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

  const saveCustomTasks = async (uid, date, tasks) => {
    try {
      await axios.post("http://localhost:5001/api/customTasks", {
        userId: uid,
        date,
        tasks,
      });
    } catch (error) {
      console.error("Error saving custom tasks", error);
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

  const updateCustomEventsForDate = (date, tasks) => {
    const newEvent = {
      title: `Custom Event`,
      start: date,
      color: "#0000FF",
      description: tasks.map((task) => task.task).join(", "), // Join tasks as description
    };

    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.start === date ? newEvent : event))
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
        if (completedTasks === 0) {
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
            events={[...events, ...eventMeeting, ...myCustomEvents]}
            dateClick={handleDateClick}
            eventContent={renderEventContent}
            eventClassNames={eventClassNames}
            id="Calen"
          />
        </div>
        <div className="todo-list">
          <div className="TopicMeet"> To-Do List for {selectedDate}</div>
          <div className="Admibtn">
            {selectedDate !== currentDateString && (
              <button
                className="editMeetBtn"
                onClick={() => setIsEditable(!isEditable)}
              >
                {isEditable ? "Disable" : "Enable"}
              </button>
            )}
            {selectedDate !== currentDateString && (
              <button
                className="editMeetBtn"
                onClick={() => setIsshowPopup(!isshowPopup)}
              >
                {isshowPopup ? " Cancel" : "Add"}
              </button>
            )}
          </div>

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
                    disabled={!isEditable}
                  />
                )}
                {task.task}
              </li>
            ))}
          </ul>
          {myCustomTasks && (
            <div>
              My Custom Task
              <ul>
                {myCustomTasks.map((task, index) => (
                  <li key={index}>
                    {isEditable ? (
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => handleCustomTaskChange(index)}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={task.done}
                        disabled={!isEditable}
                      />
                    )}
                    {task.task}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            {meeting && meeting.length > 0 && (
              <div className="meeting">
                <div className="TopicMeet2">Meeting</div>
                <div className="meetDetails">
                  {meeting.map((meet, index) => (
                    <div key={index}>
                      <div className="meetText">Title: {meet.postId.text}</div>
                      <div className="meetText">By: {meet.postId.author}</div>
                      <div className="meetText">
                        Date: {meet.postId.dateTime}
                      </div>
                    </div>
                  ))}
                </div>
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
            placeholder="Enter task"
          />
          <button onClick={handleAddTask}>Add Task</button>
          <ul>
            {customTasks.map((task, index) => (
              <li key={index} className="itempopup">
                {task}
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="delbtn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleAddOrUpdateEvent}>Save Event</button>
        </div>
      )}

      <footer className="foot">
        <div className="footer-content">
          <div className="footer-section">
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              tempor consequat magna, nec tincidunt turpis dictum quis.
            </p>
          </div>
          <div className="footer-section">
            <h2>Contact Us</h2>
            <p>Email: jogjive@gmail.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 YourWebsite. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default CalenderPage;

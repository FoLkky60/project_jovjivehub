import React from "react";
import "./index.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import ContentPage from "./app/ContentPage";
import HostLive from "./app/HostLive";
import RegisterForm from "./components/Login/RegisterForm";
import CalenderPage from "./app/CalenderPage";
import FeedPage from "./app/FeedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ContentPage />,
  },
  {
    path: "/HostLive/",
    element: <HostLive />,
  },
  {
    path: "/Login",
    element: <RegisterForm />,
  },
  {
    path: "/Calender",
    element: <CalenderPage />,
  },
  {
    path: "/feed",
    element: <FeedPage />,
  },
  
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

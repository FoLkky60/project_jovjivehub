// import React from 'react'

// import App from './App.jsx'
// import './index.css'
// import MainLayout from './components/Layout/MainLayout'
// import RegisterForm from './components/Login/RegisterForm'


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
  
// )


import React from 'react'
import './index.css'
import Navbar from './components/nav/Navbar'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import ContainPage from './app/ContainPage'
import HostLive from './app/HostLive'
import RegisterForm from './components/Login/RegisterForm'

const router = createBrowserRouter([
  {
    path:"/Home",
    element: <ContainPage/>
  },
  {
  path:"/HostLive",
  element: <HostLive/>
  },
  {
    path:"/Login",
    element: <RegisterForm/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  
)

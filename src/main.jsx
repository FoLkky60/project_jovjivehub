
import React from 'react'
import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,Router,RouterProvider } from 'react-router-dom'
import ContainPage from './app/ContainPage'
import HostLive from './app/HostLive'
import RegisterForm from './components/Login/RegisterForm'
import LoginForm from './components/Login/LoginForm'

const router = createBrowserRouter([
  {
    path:"Home",
    element: <ContainPage/>
  },
  {
  path:"HostLive",
    element: <HostLive/>
  },
  {
    path:"Login",
    element: <RegisterForm/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  
)

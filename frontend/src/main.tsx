import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PageNotFound from './components/PageNotFound.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import axios from 'axios'
import HomePage from './pages/HomePage.tsx'
import Chats from './pages/Chats.tsx'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ADDRESS


const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: "/home",
        element: <HomePage/>
      },
      {
        path: "/chats",
        element: <Chats/>
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>,
    errorElement: <PageNotFound/>
  },
  {
    path: "/register",
    element: <Register/>,
    errorElement: <PageNotFound/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

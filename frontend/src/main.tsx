import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PageNotFound from './components/PageNotFound.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import axios from 'axios'
import HomePage from './pages/HomePage.tsx'

axios.defaults.withCredentials = true


const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: "/home",
        element: <HomePage/>
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

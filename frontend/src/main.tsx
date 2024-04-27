import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PageNotFound from './components/PageNotFound.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <PageNotFound/>,
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

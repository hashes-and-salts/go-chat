import { AppBar, Box, Container, Stack, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { Outlet, useNavigate } from "react-router-dom"
import LeftSidebar from "./layout/LeftSidebar"
import MainArea from "./layout/MainArea"
import RightSidebar from "./layout/RightSidebar"


function App() {
  const navigateTo = useNavigate()
  const [redirect, setRedirect] = useState(false)

  const [username, setUsername] = useState("")


  const getUserInfo = async () => {
    try {
      const response = await axios.get("/user")

      console.log('response.data', response.data)
      setUsername(response.data.username)

      setRedirect(false)
    } catch (e) {
      console.error(e)
      setRedirect(true)
    }
  }

  useEffect(() => {
    console.log("inside app.tsx")
    getUserInfo()
    console.log("getUserInfo called")

  })


  if (redirect) {
    navigateTo("/login")
  }

  return (
    <Box>
    <nav>
      <Toolbar>
        This is the app bar
      </Toolbar>
    </nav>

    <Container>

      <Stack direction={'row'} gap={2}>

        {/* <LeftSidebar/> */}

        <Outlet/>

        {/* <MainArea/> */}

        <RightSidebar/>

      </Stack>

    </Container>


    </Box>
  )
}

export default App

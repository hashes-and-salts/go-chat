import { Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


function App() {
  const navigateTo = useNavigate()
  const [redirect, setRedirect] = useState(false)

  const [username, setUsername] = useState("")


  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://0.0.0.0:8080/api/user")

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
    <>
    <Container>
      <Typography variant="h2">
        Hello, {username}
      </Typography>
    </Container>
    </>
  )
}

export default App

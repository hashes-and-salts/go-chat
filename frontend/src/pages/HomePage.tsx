import { Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const [username, setUsername] = useState("")

    useEffect(() => {
        console.log("component mount")
    })


  return (
    <Container>
        <Typography variant='h2'>
            Hello, {username}
        </Typography>
    </Container>
  )
}

export default HomePage
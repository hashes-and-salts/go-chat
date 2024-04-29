import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

interface FormData {
    username: string
    password: string
}

const Login = () => {
    const navigateTo = useNavigate()

    const [redirect, setRedirect] = useState(false)

    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
    })

    const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmission = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            // const address = import.meta.env.VITE_SECRET
            await axios.post(
                "http://0.0.0.0:8080/api/login",
                formData,
            )

            setRedirect(true)

        } catch (e) {
            console.error(e)
            setRedirect(false)
        }
    }

    useEffect(() => {
        if(redirect) {
            console.log('redirecting to home')
            navigateTo("/")
        }
    }, [redirect])


  return (
    <Container maxWidth={"xs"} sx={{mt:12}}>

        <Typography textAlign={"center"} sx={{p:2}} variant="h5">
            Login
        </Typography>

        <Box component={"form"} onSubmit={handleSubmission}>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    
                    <TextField
                        required
                        label="username"
                        type="text"
                        value={formData.username}
                        name="username"
                        onChange={handleFormDataChange}
                        fullWidth
                        />

                </Grid>
                <Grid item xs={12}>
                    
                    <TextField
                        required
                        label="password"
                        type="password"
                        value={formData.password}
                        name="password"
                        onChange={handleFormDataChange}
                        fullWidth
                        />

                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" type="submit" fullWidth sx={{p:1, mt:1, mb:2}}>
                        Login
                    </Button>
                </Grid>

            </Grid>

            <Grid container justifyContent={"flex-end"}>
                <Link component={RouterLink} to="/register">
                    Don't have an account? Register
                </Link>
            </Grid>

        </Box>
    </Container>
  )
}

export default Login

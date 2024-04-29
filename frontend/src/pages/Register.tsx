import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Navigate, Link as RouterLink, redirect, useNavigate } from 'react-router-dom'

interface FormData {
    firstname: string
    lastname: string
    username: string
    email: string
    password: string
    confirmPassword: string
}

const Register = () => {

    const navigateTo = useNavigate()

    const [formData, setFormData] = useState<FormData>({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [redirectToLogin, setRedirectToLogin] = useState(false)

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
            await axios.post(
                "http://0.0.0.0:8080/api/register",
                formData
            )

            setRedirectToLogin(true)

        } catch (e) {
            console.error(e)
            setRedirectToLogin(false)
        }

    }

    useEffect(() => {
        if(redirectToLogin) {
            console.log("redirecting to login page")
            navigateTo("/login")
        }
    }, [redirectToLogin])

  return (
    <Container maxWidth="sm">
        <Box sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Box sx={{
                padding: 2,
            }}>
                <Typography component={"h1"} variant="h5" textAlign={"center"} padding={4}>
                    Register
                </Typography>

                <Box component={"form"} onSubmit={handleSubmission}>

                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                name="firstname"
                                type="text"
                                value={formData.firstname}
                                onChange={handleFormDataChange}                                
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                type="text"
                                value={formData.lastname}
                                onChange={handleFormDataChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleFormDataChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleFormDataChange}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleFormDataChange}
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="confirmPassword"
                                label="Re-type Password"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleFormDataChange}
                            />
                        </Grid>

                        <Grid item xs={12}>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt:2, mb:2, p:1 }}
                            >
                                Register
                            </Button>

                        </Grid>

                    </Grid>

                    <Grid container justifyContent={"flex-end"}>
                        <Link component={RouterLink} to={"/login"}>
                            <Typography>
                                Have an account already? Login
                            </Typography>
                        </Link>

                    </Grid>
                    
                </Box>

            </Box>

        </Box>
    </Container>
  )
}

export default Register
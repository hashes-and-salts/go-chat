import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'


const Register = () => {

    const handleSubmission = async (e: React.SyntheticEvent) => {
        e.preventDefault()
    }

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
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
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

                    <Grid container xs={12} justifyContent={"flex-end"}>
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
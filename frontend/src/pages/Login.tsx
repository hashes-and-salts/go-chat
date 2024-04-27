import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Login = () => {

    const handleSubmission = async (e: React.SyntheticEvent) => {
        e.preventDefault()
    }


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
                        fullWidth
                        />

                </Grid>
                <Grid item xs={12}>
                    
                    <TextField
                        required
                        label="password"
                        type="password"
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
import { People, Person } from '@mui/icons-material'
import { Button, Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { ChatContext } from '../App'
import { theme } from '../theme'
import axios from 'axios'

const Sidebar = () => {

    const chatContext = React.useContext(ChatContext)

    const fetchOnlineUsers = async () => {
        try {
            const response = await axios.get( "http://localhost:8000/get-online-users" ) 
            const usersArray: string[] = response.data
            usersArray.unshift('Group')
            chatContext.setOnlineUsers(usersArray)
        } catch (error) {
            // TODO handle error
            alert("Cound not fetch users")
        }

    }
    
    useEffect(() => {
        const registerUser = async () => {
            if (chatContext.username !== '') {
                try {
                    await axios.post("http://localhost:8000/register-user",{
                        username: chatContext.username
                    })
                } catch(error) {
                    console.error();
                }             
            }
        }

        registerUser()
    }, [chatContext.username])

  return (
    <Box p={2} bgcolor={'Background.paper'} flex={1} m={2} boxShadow={theme.shadows[5]} display={'flex'} flexDirection={'column'} height={'80vh'}>


        <Typography variant='h6' justifyContent={'center'} textAlign={'center'}>
            { chatContext.onlineUsers.length > 0 ? "Online Users" :"No one's online!" }
        </Typography>

        <Box height={'90%'} sx={{p:1}} overflow={'scroll'} width={'300px'}>
            <List>
            {
                chatContext.onlineUsers.map((user, index) => (
                    <ListItem key={index}>
                        <ListItemButton onClick={() => {chatContext.setChattingWith(user)}}>
                            <ListItemIcon> <Person/> </ListItemIcon>
                            <ListItemText> {user} </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    ))
            }
            </List>
        </Box>


            <Button variant='contained' onClick={fetchOnlineUsers}>Fetch Users!</Button>

        {/* </Card> */}
    </Box>
  )
}

export default Sidebar
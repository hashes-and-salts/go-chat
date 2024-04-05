import { MoreVert, Send } from '@mui/icons-material'
import { Avatar, Button, Card, CardHeader, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { theme } from '../theme'
import React, { useEffect, useState } from 'react'

const ChatArea = () => {


    const [socket, setSocket] = useState<WebSocket | null>(null)
    const [messages, setMessages] = useState<String[]>([])

    const [userMessage, setUserMessage] = useState<string>('');

    
    useEffect(() => {

        const newSocket = new WebSocket('ws://localhost:8000/chat')

        newSocket.onopen = () => {
            alert('you can chat now')
        }

        newSocket.onmessage = (event) => {
            const newMessage = event.data
            setMessages(prevMessages => [...prevMessages, newMessage])
        }

        newSocket.onclose = () => {
            alert('socket closed')
        }

        setSocket(newSocket)

        return () => {
            newSocket.close()
        }

    }, [])

    const sendMessage = (event: React.FormEvent) => {
        event.preventDefault()
        if (userMessage.trim() !== '') {
            socket?.send(userMessage)
            setUserMessage('')
        }
    }


  return (
    <Box flex={2.5} p={2}>

        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant='h6'>
                Group Chat
            </Typography>


        </Box>

        <Box m={2}>

            <Card sx={{ m:1 }}>
                <Box p={2} display={'flex'} flexDirection={'column'}  sx={{ overflowY:'auto', height: { xs:'60vh' } }} borderRadius={theme.shape.borderRadius}>

                    {
                        messages.map((message, index) => (
                            <Card key={index} sx={{m:1, p:2}}>
                                <CardHeader
                                    avatar={
                                        <Avatar/>
                                    }
                                    action={
                                        <IconButton aria-label='settings'>
                                            <MoreVert/>
                                        </IconButton>
                                    }
                                    title="username"
                                    subheader={message}
                                />
                            </Card>
                        ))
                    }

                </Box>
            </Card>


            <Box m={1} display={'flex'} justifyContent={'space-between'}>
                <TextField
                    variant='outlined'
                    label="Send a Message..."
                    fullWidth
                    sx={{mr:2}}
                    value={userMessage}
                    onChange={(e) => {setUserMessage(e.target.value)}}
                />
                <Button variant='contained' sx={{ minWidth: '100px' }} onClick={sendMessage}><Send/></Button>
            </Box>

        </Box>

    </Box>
  )
}

export default ChatArea
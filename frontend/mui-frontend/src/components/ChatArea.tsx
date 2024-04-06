import { Avatar, Button, Card, CardContent, CardHeader, Container, Divider, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { ChatContext } from '../App'
import { theme } from '../theme'
import { MoreVert, Send } from '@mui/icons-material'


function ChatArea() {

    const chatContext = React.useContext(ChatContext)

    const [messageHistory, setMessageHistory] = useState<string[]>([])

    const [userMessage, setUserMessage] = useState("")

    const [webSocket, setWebSocket] = useState<WebSocket>()

    useEffect(() => {

      if(chatContext.chattingWith === '') {
        return
      }

      const socket = new WebSocket("ws://localhost:8000/chat")

      // setWebSocket(socket)
      // consoel

      socket.onclose = () => {
        alert('socket closed')
      }

      socket.onmessage = (event) => {
        // console.log(event.data);
        const newMessage = event.data

        setMessageHistory(prevMessages => [
          ...prevMessages, newMessage
        ])
      }

      socket.onopen = () => {
        alert('socket opened')
      }

      return () => {
        // setWebSocket(socket)        
        socket.close()
      }
    }, [chatContext.chattingWith])

    
    const handleSendMessage = () => {
      if(userMessage.trim() !== '') {
        webSocket?.send(userMessage)
        setUserMessage('')
      }
    }

  return (
    <Box p={2} bgcolor={'background.paper'} flex={4} m={2} boxShadow={theme.shadows[5]}>
        {
            chatContext.chattingWith === '' ?
            <Typography variant='h5'>Click on an avatar to start talking</Typography>
            :
            <>
              <Typography variant='h5' textAlign={'center'}>{chatContext.chattingWith}</Typography>
              {/* <Divider/> */}
              <Box>

                <Container sx={{p:2, display:'flex', flexDirection:'column'}}>
                  <Card sx={{p:2, overflow: 'scroll', height: '50vh'}}>
                  {/* chat history */}

                  {
                    messageHistory.map((message, index) => (
                      <Box key={index}>
                        <Card>
                          <CardHeader
                            avatar={
                              <Avatar/>
                            }
                            action={
                              <IconButton>
                                <MoreVert/>
                              </IconButton>
                            }
                            title={'username'}
                            subheader={'date'}
                          />

                          <CardContent>
                            {message}
                          </CardContent>
                        </Card>
                      </Box>

                    ))
                  }



                  </Card>
                </Container>

                <Box p={2} display={'flex'} gap={2}>
                  {/* user input */}
                  <TextField
                    variant='outlined'
                    fullWidth
                    value={userMessage}
                    onChange={(e) => {setUserMessage(e.target.value)}}
                    label={"Send a Message..."}
                    />
                  <Button variant='contained' sx={{width: '25%'}} onClick={handleSendMessage}><Send/></Button>
                </Box>

              </Box>
            </>
        }
    </Box>
  )
}

export default ChatArea
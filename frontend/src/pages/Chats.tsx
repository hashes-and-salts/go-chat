import React, { useDeferredValue, useEffect, useState } from 'react'
import LeftSidebar from '../layout/LeftSidebar'
import MainArea from '../layout/MainArea'
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Form } from 'react-router-dom'

interface OnlineUser {
  name: string,
  status: boolean
}

interface Message {
  content: string,
  sender: string
}

const Chats = () => {

  const [selectedUser, setSelectedUser] = useState<OnlineUser>({
    name: "",
    status: false
  })

  const [message, setMessage] = useState<Message>({
    content: "",
    sender: ""
  })

  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([])

  const [chatHistory, setChatHistory] = useState<Message[]>([])

  const sendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      // setMessage("")
      setMessage(prevMessage => ({...prevMessage, content: ""}))
    } catch(e) {
      console.error(e)
    }
  }

  const chatWith = async (user: OnlineUser) => {
    setSelectedUser(prevState => ({...selectedUser, name: user.name, status: user.status}))

  }

  useEffect(() => {

    const dummyUsers: OnlineUser[] = [
      {
        name: "abc",
        status: true
      },
      {
        name: "xyz",
        status: false
      },
      {
        name: "def",
        status: true
      }
    ]

    setOnlineUsers(dummyUsers)

  })

  useEffect(() => {
    const dummyMessages: Message[] = [
      {
        content: "hey There!",
        sender: "me"
      },
      {
        content: "hallo!",
        sender: "them"
      },
      {
        content: "hola!",
        sender: "me"
      },
      {
        content: "sup?",
        sender: "them"
      },
      {
        content: "hey There!",
        sender: "me"
      },
      {
        content: "howdy!",
        sender: "them"
      },
      {
        content: "hi there!",
        sender: "me"
      },
      {
        content: "greetings!",
        sender: "them"
      }
    ]

    const numberOfMessages = Math.floor(Math.random()*dummyMessages.length)

    const dummyChatHistory: Message[] = []

    for (let i=0; i<numberOfMessages; i++) {
      const randomindex = Math.floor(Math.random()*dummyMessages.length)
      dummyChatHistory.push(dummyMessages[randomindex])
    }

    setChatHistory(dummyChatHistory)
  }, [selectedUser])

  return (
    <>
    <LeftSidebar>
      <Typography variant="h6" p={2} textAlign={"center"}>
        Friends
      </Typography>
      <List>
        {
          onlineUsers.map((user, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => {chatWith(user)}}>
                <ListItemAvatar>
                  <Avatar/>
                </ListItemAvatar>
                <ListItemText>
                  {user.name}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </LeftSidebar>
    <MainArea>
      <Box height={"100%"}>
        {
          selectedUser.name !== "" ?
          <Box height={"100%"} display={"flex"} alignItems={"space-between"} flexDirection={"column"} p={2} gap={3} >

            {/* header */}
            <Box display={"flex"} p={2} gap={5}>
              <Avatar/>
              <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
                <Typography variant="h6">
                  {selectedUser.name}
                </Typography>
                <Typography variant="subtitle2">
                  {/* online/offline */}
                  {selectedUser.status ? "Online" : "Offline"}
                </Typography>
              </Box>
            </Box>

            <Box border={"1px solid grey"} borderRadius={2} width={"100%"}>
            {/* chat history */}
              <Box p={2} height={500}>
                <Box height={500} overflow={"scroll"}> 
                  {
                    chatHistory.map((message, index) => (
                      <Typography>
                        {message.sender} : {message.content}
                      </Typography>
                    ))
                  }
                </Box>
              </Box>

            {/* Message Form */}
            <Box p={2}>
              <Form onSubmit={sendMessage}>
                <Box display={"flex"} gap={2} width={"100%"}>
                  <TextField
                    fullWidth
                    label="Send a message..."
                    value={message.content}
                    onChange={(e) => {setMessage(prevMessage => ({...prevMessage, content: e.target.value}))}}
                    />
                  <Button variant="contained" sx={{pl:5, pr:5}} type="submit">Send</Button>
                </Box>
              </Form>
            </Box>
            </Box>


          </Box>
          :
          <Box height={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant="caption">Select a user to start chatting</Typography>
          </Box>
        }
      </Box>
    </MainArea>
    </>
  )
}

export default Chats
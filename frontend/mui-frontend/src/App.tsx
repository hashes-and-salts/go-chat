import { Box, Container, PaletteMode, ThemeProvider, Typography, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { Stack } from '@mui/system';

interface ChatContextType {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  chattingWith: string,
  setChattingWith: React.Dispatch<React.SetStateAction<string>>,
  onlineUsers: string[],
  setOnlineUsers: React.Dispatch<React.SetStateAction<string[]>>,
}

const initialContext: ChatContextType = {
  username: '',
  setUsername: () => {},
  chattingWith: '',
  setChattingWith: () => {},
  onlineUsers: [],
  setOnlineUsers: () => {} 
}

export const ChatContext = React.createContext<ChatContextType>(initialContext)

function App() {

  // light/dark
  const [displayMode, setDisplayMode] = useState<PaletteMode>('dark');

  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    }
  });

  const toggleDarkMode = () => {
    console.log(import.meta.env)
    setDisplayMode(displayMode === 'dark' ? 'light' : 'dark')
  }

  const [username, setUsername] = useState("")
  const [chattingWith, setChattingWith] = useState("")
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  return (
    <>
    <ThemeProvider theme={darkTheme}>

      <ChatContext.Provider value={{username, setUsername, chattingWith, setChattingWith, onlineUsers, setOnlineUsers}}>

      <NavBar toggleDarkMode={toggleDarkMode}/>
        <Box bgcolor={'background.default'} color={'text.primary'} sx={{height:'100vh', p:{xs:2}}}>
          <Container>

            {
              username !== '' ? 
              <Stack direction={'row'} spacing={2} justifyContent={'space-around'}>
              <Sidebar/>
              <ChatArea/>
            </Stack>
            :
            <>
            <Typography variant='h2'>
            🫷Stop! Set username first👆 
            </Typography>
            </>
  
            }

          </Container>
        </Box>
      </ChatContext.Provider>
    </ThemeProvider>
    </>
  )
}

export default App

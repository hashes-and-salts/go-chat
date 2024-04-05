import { Box, Container, PaletteMode, ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { Stack } from '@mui/system';

function App() {

  // light/dark
  const [displayMode, setDisplayMode] = useState<PaletteMode>('dark');

  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    }
  });

  const toggleDarkMode = () => {
    setDisplayMode(displayMode === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <NavBar toggleDarkMode={toggleDarkMode}/>
        <Box bgcolor={'background.default'} color={'text.primary'} sx={{height:'100vh'}}>
          <Container>

          <Stack direction={'row'} spacing={2} justifyContent={'space-around'}>
            <Sidebar/>

            <ChatArea/>
          </Stack>

          </Container>
        </Box>
    </ThemeProvider>
    </>
  )
}

export default App

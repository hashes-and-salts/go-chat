import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Icon, IconButton, InputBase, Menu, MenuItem, Toolbar, Tooltip, Typography, styled } from "@mui/material"
import React, { useState } from "react";
import { ChatContext } from "../App";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const NavBarOptions = styled(Box)(() => ({
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
}))

const NavBar = ( { toggleDarkMode } : { toggleDarkMode: () => void } ) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const [lightMode, setLightMode] = useState(false)

    const chatContext = React.useContext(ChatContext)

    const [changedName, setChangedName] = useState("")

    const handleRenameButtonClick = () => {
        chatContext.setUsername(changedName)
        setChangedName('')
    }

  return (
    <AppBar sx={{position: 'sticky'}}>
        <StyledToolbar>
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                Go-Chat
            </Typography>

            <Box display={"flex"} gap={2} alignItems={'center'}>
                <Typography sx={{fontWeight: 'bold'}}>
                    Chatting as:
                </Typography>
                <InputBase placeholder={chatContext.username === '' ? "Set Username..." : chatContext.username} value={changedName} onChange={(e) => setChangedName(e.target.value)}>
                </InputBase>
                <Button variant="contained" onClick={ handleRenameButtonClick } >Rename</Button>
            </Box>

            <NavBarOptions>

                <IconButton onClick={() => {setLightMode(!lightMode); toggleDarkMode()}}>
                    <Icon>
                        { lightMode ? <LightMode/> : <DarkMode/> }
                    </Icon>
                </IconButton>

                <Box sx={{cursor: 'pointer'}}>
                    <Tooltip title="Menu">
                        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                            <Avatar/>
                        </IconButton>
                    </Tooltip>
                </Box>

            </NavBarOptions>


        </StyledToolbar>

        <Menu
            sx={{mt:'45px', mr:'45px'}}
            open={menuOpen}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            onClose={() => setMenuOpen(!menuOpen)}
        >

            <MenuItem onClick={() => setMenuOpen(!menuOpen)}>
                <Typography textAlign={'center'}>Log Out</Typography>
            </MenuItem>
        
        </Menu> 


    </AppBar>


  )
}

export default NavBar
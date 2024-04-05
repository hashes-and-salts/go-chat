import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Avatar, Box, Icon, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, styled } from "@mui/material"
import { useState } from "react";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const NavBarOptions = styled(Box)(() => ({
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
}))

const NavBar = (
    {
        toggleDarkMode
    } : {
        toggleDarkMode: () => void
    }
) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const [lightMode, setLightMode] = useState(false)


  return (
    <AppBar sx={{position: 'sticky'}}>
        <StyledToolbar>
            <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                Go-Chat
            </Typography>

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
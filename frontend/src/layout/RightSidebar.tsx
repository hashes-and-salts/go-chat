import { Chat, Home, LogoutRounded } from '@mui/icons-material'
import { Box, Divider, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { red } from '@mui/material/colors'
import React, { useState } from 'react'
import { Link as RouterLink} from 'react-router-dom'

interface RightSidebarProps {
  children?: React.ReactNode
}

interface RightSidebarButton {
  name: string,
  icon: React.ReactElement
}

interface RightSidebarNavigationButton extends RightSidebarButton {
  linkTo: string
}

interface RightSidebarActionButton extends RightSidebarButton {
  onClick: () => void
}

const sidebarNavButtons: RightSidebarNavigationButton[] = [
  {
    name: "Home",
    icon: <Home/>,
    linkTo: "/home",
  },
  {
    name: "Chats",
    icon: <Chat/>,
    linkTo: "/chats"
  }
]

const sidebarActionButtons: RightSidebarActionButton[] = [
  {
    name: "LogOut",
    icon: <LogoutRounded/>,
    onClick: () => {}
  }
]

const RightSidebar: React.FC<RightSidebarProps> = ({children}) => {

  // const [selectedNavOption, setSelectedNavOption] = useState<RightSidebarNavigationButton>({
  //   icon: 
  // })
  const [selectedNavOptionName, setSelectedNavOptionName] = useState("")


  return (
    <Box
      flex={1}
      bgcolor={red[100]}
      sx={{display:{sm:"none", md: "block"}}}
      display={"flex"}
      height={"80vh"}
      justifyContent={"space-between"}
      // alignItems={"stretch"}
      >
        <Box>

        <nav>
          <List>
            {
              sidebarNavButtons.map((value, index) => (
                <ListItem key={index}>
                  <Link component={RouterLink} to={value.linkTo} sx={{ color: "black" }} underline="none" color={"transparent"}>
                    <ListItemButton selected={selectedNavOptionName === value.name}>
                      <ListItemIcon>{value.icon}</ListItemIcon>
                      <ListItemText>{value.name}</ListItemText>
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))
            }
          </List>
        </nav>
        </Box>

          {/* <Divider/> */}

<Box>

          <List>
            {
              sidebarActionButtons.map((value, index) => (
                <ListItem key={index}>
                  <ListItemButton onClick={value.onClick}>
                    <ListItemIcon>{value.icon}</ListItemIcon>
                    <ListItemText>{value.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>

                </Box>
          {children}
    </Box>
  )
}

export default RightSidebar

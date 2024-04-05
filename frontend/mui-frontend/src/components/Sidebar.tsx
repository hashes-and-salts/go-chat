import { People, Person } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
// interface OnlineUser {
//     name: string
// }

// const onlineUsers: OnlineUser[] = []

const Sidebar = () => {


  return (
    <Box flex={1} p={2}>

        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant='h6'>
                Chats
            </Typography>
        </Box>

        <Box>
            <List>

                <ListItem>
                    <ListItemButton>
                        <ListItemIcon> <People/> </ListItemIcon>
                        <ListItemText primary="Group Chat"/>
                    </ListItemButton>

                </ListItem>


                {/* {
                    onlineUsers.map((user, index) => (
                        <ListItem key={index}>
                            <ListItemButton>
                                <ListItemIcon> <Person/> </ListItemIcon>
                                <ListItemText primary={user.name}/>

                            </ListItemButton>

                        </ListItem>
                    ))
                } */}

            </List>
        </Box>



    </Box>
  )
}

export default Sidebar
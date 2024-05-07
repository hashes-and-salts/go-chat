import { Avatar, Box, Card, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material'
import React from 'react'

interface PostCardProps {
    // children?: React.ReactNode
    author: string,
    creationDate: string,
    content: string
}

const PostCard: React.FC<PostCardProps> = ({author, creationDate, content}) => {
  return (
    <Box>
        <Box m={4}>
            <Box>
                <List >
                    <ListItem>
                        <ListItemAvatar><Avatar/></ListItemAvatar>
                        <ListItemText>
                                <Typography variant="body2">
                                    {author}
                                </Typography>
                                <Typography variant="body2">
                                    {creationDate}
                                </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Box>
            <Box>
                {content}
            </Box>
        </Box>
        <Divider/>
    </Box>
  )
}

export default PostCard
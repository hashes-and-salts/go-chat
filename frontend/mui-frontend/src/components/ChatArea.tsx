import { Send } from '@mui/icons-material'
import { Button, Card, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { theme } from '../theme'

const ChatArea = () => {
  return (
    <Box flex={2.5} p={2}>

        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant='h6'>
                {/* Group Chat if in group, username else if one-on-one */}
                Group Chat
            </Typography>


        </Box>

        <Box m={2}>

            <Card sx={{ m:1 }}>
                <Box p={2} display={'flex'} overflow={'scroll'}  sx={{ height: { xs:'60vh' } }} borderRadius={theme.shape.borderRadius}>

                </Box>
            </Card>


            <Box m={1} display={'flex'} justifyContent={'space-between'}>
                <TextField
                    variant='outlined'
                    label="Send a Message..."
                    fullWidth
                    sx={{mr:2}}
                />
                <Button variant='contained' sx={{ minWidth: '100px' }}><Send/></Button>
            </Box>

        </Box>

    </Box>
  )
}

export default ChatArea
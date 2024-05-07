import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { Outlet } from 'react-router-dom'

interface MainAreaProps {
  children?: React.ReactNode
}

const MainArea: React.FC<MainAreaProps> = ({children}) => {
  return (
    <Box flex={3.5} bgcolor={blue[100]} display={children?"block":"none"}>
        {children}
    </Box>
  )
}

export default MainArea
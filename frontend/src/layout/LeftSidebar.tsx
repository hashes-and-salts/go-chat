import { Box } from '@mui/material'
import { cyan, grey } from '@mui/material/colors'
import React from 'react'
import { Outlet } from 'react-router-dom'

interface LeftSidebarProps {
  children?: React.ReactNode
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({children}) => {
  return (
    <Box flex={1.5} bgcolor={cyan[100]}>
      {children}
    </Box>
  )
}

export default LeftSidebar
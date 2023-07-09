import React from 'react'
import { Typography, Box } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import lightTheme from '../utils/lightTheme'

const Settings = () => {
  
  return (
    <ThemeProvider theme={lightTheme}>
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', backgroundColor: 'red', margin:'50px' }}>
          <Box style={{width: '100%'}}>
            <Typography variant="h4" style={{fontWeight:'bold', fontSize: '40px'}}>
              Settings
            </Typography>
          </Box>
        </Box>
    </ThemeProvider>
  )
}

export default Settings
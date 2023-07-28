import React from 'react'
import { Typography } from '@mui/material'

const SettingsGeneral = () => {
  return (
    <>
      <Typography variant='h1'>
        General settings
      </Typography>
      <Typography variant="h2" sx={{ color: 'red' }}>
        Out of Scope
      </Typography>
    </>
  )
}

export default SettingsGeneral
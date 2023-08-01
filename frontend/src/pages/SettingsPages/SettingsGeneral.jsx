import React, {useState, useEffect, useContext} from 'react'
import { Typography, Card, Switch, Box } from '@mui/material'
import axios from 'axios';
import { UserContext, ThemeContext } from '../../index'


const SettingsGeneral = () => {
  const { globalUser } = useContext(UserContext);

  const {darkMode, setDarkMode} = useContext(ThemeContext);
  const [refresh, setRefresh] = useState(0);




  const handleDarkModeToggle = async () => {
    if (!globalUser) {
      return
    }
    
      if (darkMode==true) {
        setDarkMode(false);
        await axios.patch('/user/darkmode', {
          "uid": globalUser.uid,
          "darkmode": false
        }, {withCredentials: true});
      }
      else {
        setDarkMode(true);
        await axios.patch('/user/darkmode', {
          "uid": globalUser.uid,
          "darkmode": true
        }, {withCredentials: true});
      }

  };

    return (


    <>
      <Card sx={{p: 10}}>
        <Box display="flex">
          <Typography display="flex" alignItems="center" marginRight="50px">
            Dark Mode
          </Typography>
          <Switch
            checked={darkMode}
            onChange={handleDarkModeToggle}
            color="primary"
            sx={{
              width: 100, // Adjust the width to make the switch longer
              "& .MuiSwitch-switchBase": {
                margin: 1,
                padding: 0,
                transform: "translateY(1px)",
                "&.Mui-checked": {
                  transform: "translateX(60px)",
                },
              },
            }}
          />
        </Box>
      </Card>

    </>
  )
}

export default SettingsGeneral
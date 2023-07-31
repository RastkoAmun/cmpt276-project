import React, {useState, useEffect, useContext} from 'react'
import { Typography, Card, Switch} from '@mui/material'
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
        await axios.patch('http://localhost:8080/user/darkmode', {
          "uid": globalUser.uid,
          "darkmode": false
        }, {withCredentials: true});
      }
      else {
        setDarkMode(true);
        await axios.patch('http://localhost:8080/user/darkmode', {
          "uid": globalUser.uid,
          "darkmode": true
        }, {withCredentials: true});
      }

  };

    return (


    <>
      <Card>
        <Typography>
          Dark Mode {darkMode.toString()}
        </Typography>
        <Switch
          checked={darkMode}
          onChange={handleDarkModeToggle}
          color="primary"
        />
      </Card>

    </>
  )
}

export default SettingsGeneral
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css';
import App from './App';
import Food from './pages/FeaturesPages/Food';
import Sleep from './pages/FeaturesPages/Sleep';
import Exercise from './pages/FeaturesPages/Exercise';
import Hydration from './pages/FeaturesPages/Hydration';
import Weight from './pages/FeaturesPages/Weight';
import SettingsMain from './pages/SettingsPages/SettingsMain';
import SettingsGeneral from './pages/SettingsPages/SettingsGeneral';
import SettingsProfile from './pages/SettingsPages/SettingsProfile';
import SettingsExercise from './pages/SettingsPages/SettingsExercise';
import SettingsFood from './pages/SettingsPages/SettingsFood';
import SettingsHydration from './pages/SettingsPages/SettingsHydration';
import SettingsSleep from './pages/SettingsPages/SettingsSleep';
import MainPage from './pages/MainPage';
import Login from './pages/LoginPages/Login';
import Setup from './pages/SetupPages/Setup';
import Success from './pages/LoginPages/Success';
import SignUp from './pages/LoginPages/SignUp';
import PasswordChanged from './pages/LoginPages/PasswordChanged';
import ResetLink from './pages/LoginPages/ResetLink';

import ChangePassword from './pages/LoginPages/ChangePassword';
import ForgetPassword from './pages/LoginPages/ForgetPassword';
import { ThemeProvider } from '@mui/material';
import theme from '../src/utils/lightTheme'

export const UserContext = React.createContext(null);

const CustomRouterProvider = () => {
  const [globalUser, setGlobalUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: <MainPage />
        },
        {
          path: 'food',
          element: <Food />
        },
        {
          path: 'sleep',
          element: <Sleep />
        },
        {
          path: 'exercise',
          element: <Exercise />
        },
        {
          path: 'hydration',
          element: <Hydration />
        },
        {
          path: 'weight',
          element: <Weight />
        },
        {
          path: 'settings',
          element: <SettingsMain />,
          children: [
            {
              path: '/settings',
              element: <SettingsGeneral />
            },
            {
              path: 'profile',
              element: <SettingsProfile />
            },
            {
              path: 'exercise',
              element: <SettingsExercise />
            },
            {
              path: 'food',
              element: <SettingsFood />
            },
            {
              path: 'hydration',
              element: <SettingsHydration />
            },
            {
              path: 'sleep',
              element: <SettingsSleep />
            },
          ]
        },
        
      ]
    },

    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'setup',
      element: <Setup />
    },
    {
      path: 'signup',
      element: <SignUp />
    },    
    {
      path: 'forgetpassword',
      element: <ForgetPassword />
    },
    {
      path: 'passwordchanged',
      element: <PasswordChanged />
    },
    {
      path: 'changepassword',
      element: <ChangePassword />
    },    {
      path: 'resetlink',
      element: <ResetLink />
    },
    {
      path: 'success',
      element: <Success />
    }
  ])

  return (
    <UserContext.Provider value={{ globalUser: globalUser, setGlobalUser: setGlobalUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CustomRouterProvider />
    </ThemeProvider>
  </React.StrictMode>
);

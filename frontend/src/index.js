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
import MainPage from './pages/MainPage';
import Login from './pages/LoginPages/Login';
import Setup from './pages/SetupPages/Setup';
import SignUp from './pages/LoginPages/SignUp';
import ForgetPassword from './pages/LoginPages/ForgetPassword';
import ExpiredLink from './pages/LoginPages/ExpiredLink';
import ChangePassword from './pages/LoginPages/ChangePassword';
import PasswordChanged from './pages/LoginPages/PasswordChanged';
import ResetLink from './pages/LoginPages/ResetLink';
import Admin from './pages/FeaturesPages/Admin';
import { ThemeProvider } from '@mui/material';
import '@mui/material';

export const UserContext = React.createContext(null);
export const ThemeContext = React.createContext(null); 

const CustomRouterProvider = () => {
  const [globalUser, setGlobalUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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
          path: 'admin',
          element: <Admin />
        },
        {
          path: 'setup',
          element: <Setup />
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
          ]
        },

      ]
    },

    {
      path: 'login',
      element: <Login />
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
      path: 'changepassword/:token',
      element: <ChangePassword />
    },
    {
      path: 'resetlink',
      element: <ResetLink />
    },
    {
      path: 'expiredlink/:token',
      element: <ExpiredLink />
    },
    {
      path: 'signup',
      element: <SignUp />
    }
  ])


  return (
    <UserContext.Provider value={{ globalUser: globalUser, setGlobalUser: setGlobalUser}}>
      <ThemeContext.Provider value={{ darkMode: darkMode, setDarkMode: setDarkMode }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CustomRouterProvider />
  </React.StrictMode>
);

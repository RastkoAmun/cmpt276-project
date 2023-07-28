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
import SignUp from './pages/LoginPages/SignUp';
import ForgetPassword from './pages/LoginPages/ForgetPassword';
import ResetLink from './pages/LoginPages/ResetLink';
import Admin from './pages/FeaturesPages/Admin';
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
          path: 'admin',
          element: <Admin />
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
      path: 'forgetpassword',
      element: <ForgetPassword />
    },
    {
      path: 'resetlink',
      element: <ResetLink />
    },
    {
      path: 'signup',
      element: <SignUp />
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

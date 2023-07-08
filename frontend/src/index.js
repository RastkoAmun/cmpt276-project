import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css';
import App from './App';
import Food from './pages/Food';
import Sleep from './pages/Sleep';
import Exercise from './pages/Exercise';
import Hydration from './pages/Hydration';
import Settings from './pages/Settings';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Setup from './pages/Setup/Setup';
import SignUp from './pages/SignUp';

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
      ]
    },
    {
      path: 'settings',
      element: <Settings />
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
    }
  ])

  return (
    <UserContext.Provider value={{ globalUser: globalUser, setGlobalUser: setGlobalUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  )

}


// const theme = createTheme({

// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
    {/* <App /> */}
    <CustomRouterProvider />
    {/* </ThemeProvider> */}
  </React.StrictMode>
);

import React from 'react';
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



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
        path: 'settings',
        element: <Settings />
      },
    ]
  }
])

// const theme = createTheme({

// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={theme}> */}
      {/* <App /> */}
      <RouterProvider router={router} />
    {/* </ThemeProvider> */}
  </React.StrictMode>
);

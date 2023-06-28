import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css';
import App from './App';
import Root from '../src/routes/root'
// import { ThemeProvider } from '@emotion/react';
// import { createTheme } from '@mui/material';
import Test from './routes/Test';
// import Sidebar from '../src/layout/Sidebar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'a',
        element: <Root />
      },
      {
        path: 'b',
        element: <Test />
      }
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

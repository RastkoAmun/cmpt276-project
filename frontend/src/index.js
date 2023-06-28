import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css';
import App from './App';
import Test from './routes/Test';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'a',
        element: <Test />
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

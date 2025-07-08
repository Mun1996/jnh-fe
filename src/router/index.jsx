import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Welcome from '../pages/Welcome.jsx/Welcome';
import Login from '../pages/Login/Login';
import Home from '../pages/Employee/Home/Home';
import EmptyJobs from '../pages/Employee/EmptyJobs/EmptyJobs';
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'employee',
        element: <Home />
      },
      {
        path: 'emptyJobs',
        element: <EmptyJobs />
      }
    ]
  }
]);

export default router; 
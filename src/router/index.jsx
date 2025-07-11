import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Welcome from '../pages/Welcome.jsx/Welcome';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register'; 
import Home from '../pages/Employee/Home/Home';
import EmptyJobs from '../pages/Employee/EmptyJobs/EmptyJobs';
import Pswforgetting from '../pages/Pswforgetting/Pswforgetting';
import EmptyChats from '../pages/Employee/EmptyChats/EmptyChats';
import EmptyProfile from '../pages/Employee/EmptyProfile/EmptyProfile';
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
        path:'register',
        element:<Register/>
      },
      {
        path:'pswforgetting',
        element:<Pswforgetting/>
      },
      {
        path: 'employee',
        element: <Home />
      },
      {
        path: 'emptyJobs',
        element: <EmptyJobs />
      },
      {
        path: 'emptyChats',
        element:<EmptyChats />
      },
      {
        path:'emptyProfile',
        element:<EmptyProfile />
      }
    ]
  }
]);

export default router; 
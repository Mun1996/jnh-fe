import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register'; 
import App from '../App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path:'register',
        element:<Register/>
      }
    ]
  }
]);

export default router; 
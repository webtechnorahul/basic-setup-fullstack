import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Protected from '../features/auth/pages/Protected';
import Dashboard from '../features/dashboard/pages/Dashboard';
import ChatAi from '../features/dashboard/pages/ChatAi';

export const router = createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/',
    element:<Protected/>,
    children:[
    {
      path:'dashboard',
      element:<Dashboard/>
    },
    {
      path:'ai/chat',
      element:<ChatAi/>
    }
  ]
  }
]);

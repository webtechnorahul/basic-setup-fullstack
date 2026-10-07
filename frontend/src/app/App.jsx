import React from 'react'
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import { RouterProvider } from 'react-router-dom'
import { router } from './AppRouter'
const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth'
// import cookies from 'js-cookie'
import Footer from '../../../app/shared/components/Footer'
import Navbar from '../../../app/shared/components/Navbar'

// Guards nested pages using the current session and renders the shared app layout.
const Protected = () => {
    // const {user}=useAuth();
    // const token=cookies.get("token");
    // const navigate=useNavigate()
    // useEffect(()=>{
    //     if(!token||!user){
    //     navigate('/register')
    // }
    // },[]);
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    
    </>
    
  )
}

export default Protected
import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { useAuth } from '../store/authStore'
import { useEffect } from 'react'
function RootLayout() {
  const checkAuth=useAuth(state=>state.checkAuth)
  const loading=useAuth(state=>state.authLoading);

  useEffect(()=>{
    checkAuth();
  },[]);
  if(loading){
    return <p className='text-2xl'>Loading..</p>
  }
  return (
    <div>
      <Header/>
      <div className='min-h-screen bg-slate-100'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default RootLayout
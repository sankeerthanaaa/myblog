import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
function RootLayout() {
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
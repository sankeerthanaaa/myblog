import { useState } from 'react'

import './App.css'
import RootLayout from './components/RootLayout'
import Register from './components/Register'
import AddArticle from './components/AddArticle'
import Login from './components/Login'
import Home from './components/Home'
import {createBrowserRouter,RouterProvider } from 'react-router'
function App() {

  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/addarticle",
          element:<AddArticle/>
        }
      ]
    }
  ])
  return (
    <div >
      <RouterProvider router={routerObj}/>
    </div>
  )
}

export default App

import { useState } from 'react'

import './App.css'
import RootLayout from './components/RootLayout'
import Register from './components/Register'
import AddArticle from './components/AddArticle'
import Login from './components/Login'
import Home from './components/Home'
import UserDashboard from './components/UserDashboard'
import AuthorDasboard from './components/AuthorDashboard'
import {createBrowserRouter,RouterProvider } from 'react-router'
import {Toaster} from 'react-hot-toast'
import Article from './components/Article'
import EditArticle from './components/EditArticle'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './components/Unauthorized'
import ErrorBoundary from './components/ErrorBoundary'
function App() {

  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      errorElement:<ErrorBoundary/>,
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
        },
        {
          path:"/user-profile",
          element:
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserDashboard/>
          </ProtectedRoute>
          
        },
        {
          path:"/author-profile",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <AuthorDasboard/>
          </ProtectedRoute>
        },
        {
          path:"/article/:id",
          element:<Article/>
        },
        {
          path:"/edit-article",
           element:<EditArticle />
        },
        {
          path:"/unauthorized",
          element:<Unauthorized/>
        }
      ]
    }
  ])
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
      <RouterProvider router={routerObj}/>
    </>
  )
}

export default App

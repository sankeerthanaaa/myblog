import React from 'react'
import { Navigate, redirect } from 'react-router'
import { useAuth } from '../store/authStore'

const ProtectedRoute = ({ children, allowedRoles }) => {

  const authLoading = useAuth(state => state.authLoading)
  const currentUser = useAuth(state => state.currentUser)
  const isAuthenticated = useAuth(state => state.isAuthenticated)

  // show loader ONLY while auth is resolving
  if (authLoading) {
    return <p>Loading...</p>
  }

  // not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // role check
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace state={{ redirectTo:"/"}} />
  }

  return children
}

export default ProtectedRoute
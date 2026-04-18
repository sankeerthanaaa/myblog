import React from 'react'
import { useRouteError } from 'react-router'
function ErrorBoundary() {
    const {data,status,statusText}=useRouteError();
  return (
    <div className='text-3xl text-red-500 text-center p-10 m-10 bg-red-50 border border-red-400 rounded'>
        <p className='text-8xl'>☠️</p>
        <p>{data}</p>
        <p>
            {status}: {statusText}
        </p>
    </div>
  )
}

export default ErrorBoundary
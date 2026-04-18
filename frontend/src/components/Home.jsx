import React from 'react'
import { Navigate,useNavigate } from 'react-router';
function Home() {
  // If user is already logged in, redirect to dashboard
  const isLoggedIn = false; // Replace with actual authentication check (e.g., from context or localStorage)

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-center px-6">
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">
          Welcome to Article Hub
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Read, write, and share meaningful articles with the community.
        </p>

        
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
          <h3 className="font-semibold text-xl text-amber-900 mb-2">
            Discover
          </h3>
          <p className="text-gray-600">
            Explore articles from different categories and authors.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
          <h3 className="font-semibold text-xl text-amber-900 mb-2">
            Engage
          </h3>
          <p className="text-gray-600">
            Comment, discuss, and connect with writers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
          <h3 className="font-semibold text-xl text-amber-900 mb-2">
            Create
          </h3>
          <p className="text-gray-600">
            Share your knowledge by publishing articles.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;
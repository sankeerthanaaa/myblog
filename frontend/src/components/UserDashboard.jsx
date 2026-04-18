import React, { useEffect } from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { toast } from "react-hot-toast";


function UserDashboard() {
  //get logout function
  const logout=useAuth(state=>state.logout)
  const readArticles=useAuth(state=>state.readArticles)
  const articles=useAuth(state=>state.Articles)
  const articlesLoading=useAuth(state=>state.articlesLoading)
  const currentUser=useAuth(state=>state.currentUser)
  const navigate =useNavigate();
  
  //perform logout and make it
  const onLogout=async()=>{
    toast.success("Logout Successful!")
    await logout();
    navigate("/login")
  }
  // const onReadArticle=async()=>{
  //   await readArticles();
  //   console.log(articles)
  // }

  useEffect(()=>{
    readArticles();
  },[])

  if (articlesLoading) {
    return <p>Loading articles...</p>
  }

  return (
    <div className="p-6 text-shadow-amber-950">

      <div className="flex justify-between items-center mb-6">

  {/* Page Title */}
  <h1 className="text-2xl font-bold">
    Welcome, {currentUser?.firstName || "User"}!
  </h1>

  {/* Right Side (Profile Image + Logout) */}
  <div className="flex items-center gap-4">

    {/* Profile Image */}
    <img
      src={currentUser?.profileImageUrl || "/default-avatar.png"}
      alt="profile"
      className="w-10 h-10 rounded-full object-cover border"
    />

    {/* Logout Button */}
    <button
      onClick={onLogout}
      className="bg-stone-500 hover:bg-stone-600 text-white px-4 py-2 rounded"
    >
      Log Out
    </button>

  </div>

</div>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">

        {articles?.map((article, index) => (

          <div
            key={article._id}
            onClick={()=>navigate(`/article/${article._id}`,{state:article})}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
          >

            {/* <img
              src={article.articleImageUrl}
              alt="article"
              className="h-40 w-full object-cover"
            /> */}

            <div className="p-4">

              <h2 className="text-lg font-bold mb-2 text-amber-950">
                {article.title}
              </h2>

              <p className="text-slate-600 text-sm">
                {article.content.slice(0, 100)}...
              </p>

              <p className="text-xs text-slate-400 mt-3">
               {article.category}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  
  )
}

export default UserDashboard
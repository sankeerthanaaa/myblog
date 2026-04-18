import React, { useEffect } from "react";
import { useAuth } from "../store/authStore";
import {useNavigate} from 'react-router'
import { toast } from "react-hot-toast";
function AuthorDashboard() {
  //from auth store
  const logout=useAuth(state=>state.logout)
  const readAuthorArticles = useAuth(state=>state.readAuthorArticles)
  const articles = useAuth(state=>state.Articles)
  const articlesLoading = useAuth(state=>state.articlesLoading)
  const currentUser = useAuth(state=>state.currentUser)
  const navigate=useNavigate();
  //perform logout and make it
  const onLogout=async()=>{
    toast.success("Logout Successful!")
    await logout();
    navigate("/login")
  }
  console.log("user:",currentUser);
    //to prevent from making repeated api calls
  useEffect(()=>{
  if(currentUser){
    readAuthorArticles(currentUser?._id ?? currentUser?.userId);
  }
},[currentUser])
if (articlesLoading) {
  return <p>Loading articles...</p>
}

if(!articles){
  return <p>No articles found.</p>
}

  return (

    <div className="p-6 text-amber-950">

      <div className="flex justify-between items-center mb-6">

  <h1 className="text-2xl font-bold">
    Welcome, {currentUser?.firstName || "User"}!
  </h1>

  <div className="flex gap-3">
    
    <button
      onClick={()=>navigate("/addarticle")}
      className="bg-stone-700 hover:bg-stone-800 text-white px-4 py-2 rounded"
    >
      + Add Article
    </button>

    <button
      onClick={onLogout}
      className="bg-stone-500 hover:bg-stone-600 text-white px-4 py-2 rounded"
    >
      Log Out
    </button>

  </div>

</div>

      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {articles?.map((article)=>(
          
          <div
            key={article._id}
            onClick={()=>navigate(`/article/${article._id}`,{state:article})}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
          >
            
            <div className="p-4">

              <h2 className="text-lg font-bold mb-2">
                {article.title} 
              </h2>

              <p className="text-gray-600 text-sm">
                {article.content.slice(0,100)}...
              </p>

              <p className="text-xs text-gray-400 mt-3">
                Category: {article.category}
              </p>
              <div className="flex justify-between mt-4">

      

      

    </div>
            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AuthorDashboard
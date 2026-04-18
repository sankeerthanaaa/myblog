import {create} from'zustand'
import axios from 'axios';


export const useAuth=create((set)=>({
    currentUser:null,
    isAuthenticated:false,
    authLoading:false,
    articlesLoading:false,
    error:null,
    Articles:[],
    login:async(userCredWithRole)=>{
        const {role,...userCred}=userCredWithRole;
        try{
            //set auth loading true
            set({authLoading:true,error:null})
            //make api call
            let res =await axios.post("http://localhost:4000/common-api/login",userCred,{withCredentials:true});
            console.log("res :",res);
            //update state
            set({
                authLoading:false,
                isAuthenticated:true,
                currentUser:res.data.payload
            });
        }
        catch(err){
            console.log("error is :",err.response?.data?.error);
            set({
                authLoading:false,
                error:err.response?.data?.error || "Login failed",
                isAuthenticated:false,
                currentUser:null
            });
        }
        
    },
    logout:async()=>{
        try{
            //set auth loading state
            set({authLoading:true,error:null})
            //make logout api
            let res = await axios.post("http://localhost:4000/common-api/logout",{withCredentials:true});

            //update state
            set({
                authLoading:false,
                isAuthenticated:false,
                currentUser:null
            });
        }
        catch(err){
            console.log("error is :",err.response?.data?.error);
            set({
                authLoading:false,
                error:err.response?.data?.error || "Logout failed",
                isAuthenticated:false,
                currentUser:null
            });
        }
    },
    readArticles:async()=>{
        try{
            set({articlesLoading:true,error:null})
            //make read req
            let res =await axios.get("http://localhost:4000/user-api/articles",{withCredentials:true})
            console.log(res.data.payload)
            set({
                articlesLoading:false,
                Articles:res.data.payload
            })
        }
        catch(err){
            console.log("err is:",err);
            set({
                articlesLoading:false,
                Articles:[],
                error:err.response?.data?.error || "cant access articles"
            })
        }
    },
    
    readAuthorArticles:async(authorId)=>{
        try{
            set({articlesLoading:true,error:null})
            //make read req
            let res =await axios.get(`http://localhost:4000/author-api/articles/${authorId}`,{withCredentials:true})
            
            console.log(res.data.payload)
            set({
                articlesLoading:false,
                Articles:res.data.payload
            })
        }
        catch(err){
            console.log("err is:",err);
            set({
                articlesLoading:false,
                Articles:[],
                error:err.response?.data?.error || "cant access articles"
            })
        }
    },
    //restore the login
    // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("http://localhost:4000/common-api/check-auth", { withCredentials: true });
        //console.log("Auth check response:", res);
      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  }
    
}))
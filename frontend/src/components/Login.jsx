import {useForm} from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function Login(){

const {register,handleSubmit,formState:{errors}} = useForm();
const login=useAuth(state=>state.login)
const isAuthenticated=useAuth(state=>state.isAuthenticated)
const currentUser=useAuth(state=>state.currentUser)
const error =useAuth(state=>state.error)
const navigate =useNavigate();

const onUserLogin = async (userCredObj) =>{
    await login(userCredObj);
};

useEffect(()=>{
    if(currentUser?.role==="USER"){
    toast.success("Logged in Successfully!")
    navigate("/user-profile");
}
if(currentUser?.role==="AUTHOR"){
    navigate("/author-profile");
}
if(currentUser?.role==="ADMIN"){
    navigate("/admin-profile");
}
},[isAuthenticated,currentUser])
const onSubmit=(data)=>{
    onUserLogin(data)
    
}
return(

<div className="flex justify-center items-center min-h-screen bg-slate-100 text-amber-950">

<form onSubmit={handleSubmit(onSubmit)} className="bg-stone-100 p-8 w-80 shadow-md rounded">

<h2 className="text-xl font-bold text-center mb-4">Login</h2>

<p className="text-red-500">{error}</p>

<input
placeholder="Email"
className="w-full border p-2 mb-2 rounded"
{...register("email",{required:"Email is required"})}
/>

<p className="text-red-500 text-sm">{errors.email?.message}</p>

<input
type="password"
placeholder="Password"
className="w-full border p-2 mb-4 rounded"
{...register("password",{required:"Password is required"})}
/>

<p className="text-red-500 text-sm">{errors.password?.message}</p>

<button className="bg-stone-500 hover:bg-stone-600 text-white w-full py-2 rounded">
Login
</button>

</form>

</div>
)
}

export default Login
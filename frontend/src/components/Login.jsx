import {useForm} from "react-hook-form";

function Login(){

const {register,handleSubmit,formState:{errors}} = useForm();

const onSubmit=(data)=>{
console.log(data)
}

return(

<div className="flex justify-center items-center min-h-screen bg-slate-100 text-amber-950">

<form onSubmit={handleSubmit(onSubmit)} className="bg-stone-100 p-8 w-80 shadow-md rounded">

<h2 className="text-xl font-bold text-center mb-4">Login</h2>

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
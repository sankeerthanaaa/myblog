import { useForm } from "react-hook-form";

function Register(){

const {register,handleSubmit,formState:{errors}} = useForm();

const onSubmit=(data)=>{
console.log(data)
}

return(

<div className="flex justify-center items-center min-h-screen bg-slate-100 text-amber-950">

<form onSubmit={handleSubmit(onSubmit)} className="bg-stone-100 p-8 w-96 shadow-md rounded">

<h2 className="text-xl font-bold text-center mb-4">Register</h2>

{/* ROLE */}

<div className="mb-3">
<label>Select Role</label><br/>

<input type="radio" value="USER"
{...register("role",{required:"Role is required"})}/> User

<input type="radio" value="AUTHOR"
className="ml-3"
{...register("role",{required:"Role is required"})}/> Author

{errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
</div>

{/* FIRST NAME */}
<div className="flex gap-3">
<input
placeholder="First Name"
className="w-full border p-2 mb-2 rounded"
{...register("firstName",{required:"First name is required"})}
/>

<p className="text-red-500 text-sm">{errors.firstName?.message}</p>


{/* LAST NAME */}

<input
placeholder="Last Name"
className="w-full border p-2 mb-2 rounded"
{...register("lastName",{required:"Last name is required"})}
/>

<p className="text-red-500 text-sm">{errors.lastName?.message}</p>
</div>

{/* EMAIL */}

<input
placeholder="Email"
className="w-full border p-2 mb-2 rounded "
{...register("email",{
required:"Email is required",
pattern:{
value:/^\S+@\S+\.\S+$/,
message:"Invalid email format"
}
})}
/>

<p className="text-red-500 text-sm">{errors.email?.message}</p>


{/* PASSWORD */}

<input
type="password"
placeholder="Password"
className="w-full border p-2 mb-2 rounded "
{...register("password",{
required:"Password is required",
minLength:{
value:6,
message:"Password must be at least 6 characters"
}
})}
/>

<p className="text-red-500 text-sm">{errors.password?.message}</p>


{/* IMAGE */}

<input
type="file"
className="w-full border p-2 mb-4 rounded"
{...register("ProfileImageUrl")}
/>


<button className="bg-stone-500 hover:bg-stone-600 text-white w-full py-2 rounded">
Register
</button>

</form>

</div>
)
}

export default Register
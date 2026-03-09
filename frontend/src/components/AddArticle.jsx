import {useForm} from "react-hook-form";

function AddArticle(){

const {register,handleSubmit,formState:{errors}} = useForm();

const onSubmit=(data)=>{
console.log(data)
}

return(

<div className="flex justify-center items-center min-h-screen bg-slate-100">

<form onSubmit={handleSubmit(onSubmit)} className="bg-teal-50 p-8 w-96 shadow-md rounded">

<h2 className="text-xl font-bold text-center mb-4">Add Article</h2>

{/* TITLE */}

<input
placeholder="Title"
className="w-full border p-2 mb-2 rounded"
{...register("title",{required:"Title is required"})}
/>

<p className="text-red-500 text-sm">{errors.title?.message}</p>


{/* CATEGORY */}

<input
placeholder="Category"
className="w-full border p-2 mb-2 rounded"
{...register("category",{required:"Category is required"})}
/>

<p className="text-red-500 text-sm">{errors.category?.message}</p>


{/* CONTENT */}

<textarea
placeholder="Content"
rows="4"
className="w-full border p-2 mb-4 rounded"
{...register("content",{required:"Content is required"})}
/>

<p className="text-red-500 text-sm">{errors.content?.message}</p>


<button className="bg-teal-500 hover:bg-teal-600 text-white w-full py-2 rounded">
Publish Article
</button>

</form>

</div>
)
}

export default AddArticle
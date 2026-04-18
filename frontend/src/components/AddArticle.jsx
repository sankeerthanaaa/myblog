import {useForm} from "react-hook-form";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
function AddArticle(){

const {register,handleSubmit,formState:{errors}} = useForm();
const currentUser = useAuth(state => state.currentUser)
const navigate = useNavigate()

const onSubmit = async (data) => {
  try {
    const articleData = {
      ...data,
      author: currentUser._id
    };

    let res = await axios.post(
      "http://localhost:4000/author-api/articles",
      articleData,
      { withCredentials: true }
    );

    console.log(res.data);

    navigate("/author-profile");

  } catch (err) {
    console.log(err);
  }
};

return(

<div className="flex justify-center items-center min-h-screen bg-slate-100 text-amber-950">

<form onSubmit={handleSubmit(onSubmit)} className="bg-stone-100 p-8 w-96 shadow-md rounded">

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


<button className="bg-stone-500 hover:bg-stone-600 text-white w-full py-2 rounded">
Publish Article
</button>

</form>

</div>
)
}

export default AddArticle
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";

function EditArticle() {
  const { state } = useLocation();
  const article = state;
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  //prefill values
  useEffect(() => {
    if (!article) return;

    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);

  const onSubmit = async (data) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/author-api/articles/${article._id}`,
      data,
      { withCredentials: true }
    );

    navigate(`/article/${article._id}`, {
      state: { ...article, ...data }, // merged with updated fields
    });

  } catch (err) {
    console.log(err);
  }
};
  if (!article) {
    return <p className="text-center mt-10">No article data</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 text-amber-950">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-stone-100 p-8 w-96 shadow-md rounded"
      >

        <h2 className="text-xl font-bold text-center mb-6">
          Edit Article
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          {...register("category")}
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Content */}
        <textarea
          placeholder="Content"
          rows="5"
          {...register("content")}
          className="w-full border p-2 mb-4 rounded"
        ></textarea>

        {/* Buttons */}
        <div className="flex justify-between gap-3">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-1/2 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Update
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditArticle;
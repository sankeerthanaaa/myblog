import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";

function Article() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
  register,
  handleSubmit,
  reset,
} = useForm();
  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user-api/article/${id}`,
          { withCredentials: true }
        );
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    if (!window.confirm(newStatus ? "Restore this article?" : "Delete this article?")) return;

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true }
      );
      setArticle(res.data.payload);
      toast.success(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message;
      if (err.response?.status === 400) toast(msg);
      else setError(msg || "Operation failed");
    }
  };
  const addComment = async (data) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/user-api/articles`,
      {
        articleId: id,
        comment: data.comment
      },
      { withCredentials: true }
    );

    setArticle(res.data.payload); // now exists
    reset();
    toast.success(res.data.message);
  } catch (err) {
    console.log(err);
    toast.error(err.response?.data?.message || "Error occurred");
  }
};

  if (loading) return <p className="text-center mt-10">Loading article...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!article) return null;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-stone-100 shadow-lg rounded-lg text-amber-950">
      <div className="flex justify-end mb-4 gap-2">
        {user?.role === "AUTHOR" && (
          <>
            <button
              onClick={() => navigate("/edit-article", { state: article })}
              className="bg-stone-700 hover:bg-stone-800 text-white px-4 py-2 rounded"
            >
              Edit Article
            </button>
            <button
              onClick={toggleArticleStatus}
              className={`px-4 py-2 rounded text-white ${
                article.isArticleActive
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {article.isArticleActive ? "Delete" : "Restore"}
            </button>
          </>
        )}
      </div>

      <h1 className="text-3xl font-bold text-center mb-1">{article.title}</h1>

      <p className="text-center text-gray-500 mb-8">
        Created at: {formatIST(article.createdAt)}
      </p>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-3 text-amber-950 leading-relaxed bg-stone-200 p-4 rounded-lg shadow-sm">
          <p>{article.content}</p>
          <p className="mt-8 text-sm text-gray-400">
            Updated at: {formatIST(article.updatedAt)}
          </p>
        </div>

        <div className="col-span-1">
          <div className="bg-stone-200 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-amber-950">Category</p>
            <p className="font-semibold text-lg text-amber-900">{article.category}</p>
          </div>
        </div>
      </div>
      {/* COMMENT SECTION */}
<div className="mt-12">
  <h2 className="text-2xl font-bold mb-6">Comments</h2>

  {/* Add comment (USER only) */}
  {user?.role === "USER" && (
    <div className="bg-stone-200 p-6 rounded-2xl mb-8 shadow-sm">
      <form onSubmit={handleSubmit(addComment)}>
        <input
          type="text"
          {...register("comment", { required: true })}
          placeholder="Write your comment here..."
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <button
          type="submit"
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-2xl mt-4"
        >
          Add Comment
        </button>
      </form>
    </div>
  )}

  {/* Display comments */}
  {article.comments?.length > 0 ? (
    article.comments.map((comment, index) => (
      <div
        key={index}
        className="bg-gray-300 p-6 rounded-2xl mb-4 shadow-sm"
      >
        <p className="uppercase text-pink-500 font-bold mb-2">
          {comment.user?.email}
        </p>
        <p>{comment.comment}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No comments yet.</p>
  )}
</div>
    </div>
  );
}

export default Article;
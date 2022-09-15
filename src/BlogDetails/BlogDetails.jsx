import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  const handleClick = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("Blog deleted");
      history.push("/");
    });
  };

  return (
    <div className="blog-details">
      {isPending && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;

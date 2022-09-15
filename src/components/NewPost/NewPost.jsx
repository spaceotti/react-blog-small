import React from "react";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

function NewPost() {
  const inputRef = useRef();
  const history = useHistory();
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState({
    blogtitle: "",
    blogbody: "",
    blogauthor: "",
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const { blogtitle: title, blogbody: body, blogauthor: author } = data;
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, author }),
    }).then(() => {
      setIsPending(false);
      console.log("New post added");
      history.push("/");
    });

    setData({
      blogtitle: "",
      blogbody: "",
      blogauthor: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const canSave = [...Object.values(data)].every(Boolean);

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="blogtitle">Title:</label>
        <input
          type="text"
          required
          id="blogtitle"
          name="blogtitle"
          ref={inputRef}
          onChange={handleChange}
          value={data.blogtitle}
        />

        <label htmlFor="blogbody">Body:</label>
        <textarea
          required
          id="blogbody"
          name="blogbody"
          onChange={handleChange}
          value={data.blogbody}
        ></textarea>

        <label htmlFor="blogauthor">Blog Author:</label>
        <select
          id="blogauthor"
          name="blogauthor"
          value={data.blogauthor}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Mario">Mario</option>
          <option value="Luigi">Luigi</option>
        </select>
        {isPending ? (
          <button disabled>Adding Blog...</button>
        ) : (
          <button disabled={!canSave}>Add Blog</button>
        )}
      </form>
    </div>
  );
}

export default NewPost;

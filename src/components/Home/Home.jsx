import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import BlogList from "../BlogList/BlogList";

const Home = () => {
  const url = "http://localhost:8000/blogs";

  const { data: blogs, isPending, error } = useFetch(url);

  return (
    <div className="home">
      {error && <h2>{error}</h2>}
      {isPending && <h2>Loading...</h2>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;

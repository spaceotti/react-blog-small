import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const getBlogs = async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setData(data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(err.message);
          setIsPending(false);
        }
      }
    };

    setTimeout(() => {
      getBlogs();
    }, 1000);

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

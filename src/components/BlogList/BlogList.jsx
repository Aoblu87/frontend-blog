import { useEffect, useState } from "react";
import BlogItem from "../BlogItem/BlogItem";

export default function BlogList(props) {
  const { result } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/blogPosts");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 gap-6 ">
        {loading ? (
          <div className="d-flex mt-5">
            <span className="loading loading-spinner text-info"></span>
          </div>
        ) : result ? (
          result.map((post, i) => (
            <div key={`item-${i}`}>
              <BlogItem key={post.title} {...post} loading={loading} />
            </div>
          ))
        ) : (
          posts.map((post, i) => (
            <div key={`item-${i}`}>
              <BlogItem key={post.title} {...post} loading={loading} />
            </div>
          ))
        )}
      </div>
    </>
  );
}

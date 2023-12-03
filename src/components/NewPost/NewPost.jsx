import cn from "classnames";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../TextEditor";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function NewPost() {
  const [text, setText] = useState("");
  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [idAuthor, setIdAuthor] = useState("");
  const [category, setCategory] = useState("");
  // const [cover, setCover] = useState(new FormData()); //FormData e' una classe usata per raccogliere dati non stringa dai form
  const [readTime, setReadTime] = useState("");

  const handleChange = useCallback((value) => {
    setText(value);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      readTime: {
        value: readTime,
      },
      author: {
        _id: idAuthor,
      },

      category: category,
      title: title,
      // cover,
      content: text,
    };

    try {
      fetch(`http://localhost:${import.meta.env.VITE_MY_PORT}/api/blogPosts/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
        // cover,
      })
        .then(function (response) {
          if (response.ok) {
            toast.success("Comment saved successfully!", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else {
            toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_LEFT,
            });
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })

        .then(setBlog(formData))
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Add Post
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-h-fit">
          <form method="dialog" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="font-bold text-lg flex justify-center">New Post</h3>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Author ID</span>
              </div>
              <input
                type="text"
                placeholder="234234234234234234"
                className="input input-bordered w-full max-w-[100%] mb-3"
                required
                value={idAuthor}
                onChange={(e) => setIdAuthor(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Title</span>
              </div>
              <input
                type="text"
                placeholder="Announcing new software"
                className="input input-bordered w-full max-w-[100%] mb-3"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Category</span>
              </div>
              <select
                className="select select-bordered"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled selected>
                  Pick one
                </option>
                <option>Software</option>
                <option>Job's Interviews</option>
                <option>AI </option>
                <option>Frontend</option>
                <option>Backend</option>
              </select>
            </label>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Add cover</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-[100%] mb-3"
              />
            </label>
            <label className="form-control w-full max-w-[100%] mb-3">
              <div className="label">
                <span className="label-text font-bold">Read time</span>
              </div>
              <select
                className="select select-bordered select-xs w-full max-w-[100%] mb-3"
                required
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
              >
                <option disabled selected>
                  Minute
                </option>
                <option value="1">1 minute</option>
                <option value="2">2 minute</option>
                <option value="3">3 minute</option>
              </select>
            </label>
            <label
              className={cn(
                "form-control w-full max-w-[100%] mb-3 ",
                styles.newBlogContentContainer
              )}
            >
              <div className="label">
                <span className="label-text font-bold">Comment</span>
              </div>
              <TextEditor
                theme="snow"
                className={cn("max-h-24", styles.newBlogContent)}
                text={text}
                setText={setText}
                required
                onChange={handleChange}
              />
            </label>
            <div className="flex justify-end my-5 ">
              <button className="btn btn-success " type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

import cn from "classnames"
import { useCallback, useEffect, useState } from "react"
import "react-quill/dist/quill.snow.css"
import { ToastContainer, toast, useToast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import TextEditor from "./TextEditor"
import styles from "./styles.module.scss"
import { Link } from "react-router-dom"

export default function NewPost() {
    const [text, setText] = useState("")
    const [blog, setBlog] = useState()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [idAuthor, setIdAuthor] = useState("")
    const [category, setCategory] = useState("")
    const [cover, setCover] = useState(null)
    const [readTime, setReadTime] = useState("")
    const [posts, setPosts] = useState([])

    // const getPosts = async () => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:${import.meta.env.VITE_MY_PORT}/api/blogPosts`
    //     );

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     setPosts(data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // Controllo cambiamento nella text area
    const handleChange = useCallback((value) => {
        setText(value)
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const textData = {
            readTime: {
                value: readTime,
            },
            author: {
                _id: idAuthor,
            },

            category: category,
            title: title,

            content: text,
        }
        const formData = new FormData()
        formData.append("cover", cover)

        try {
            // Fetch POST per aggiungere BlogPOST
            const textResponse = await fetch(
                `http://localhost:${
                    import.meta.env.VITE_MY_PORT
                }/api/blogPosts/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(textData),
                }
            )
            if (textResponse.ok) {
                const textDataResponse = await textResponse.json()
                const { _id } = textDataResponse
                console.log(textDataResponse)
                // fetch PATCH per aggiungere Cover
                const fileResponse = await fetch(
                    `http://localhost:${
                        import.meta.env.VITE_MY_PORT
                    }/api/blogPosts/${_id}/cover`,
                    {
                        method: "PATCH",
                        body: formData,
                    }
                )
            }
            if (fileResponse.ok) {
                const fileDataResponse = await fileResponse.json()
                console.log(fileDataResponse)
                useToast.success("Comment saved successfully!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        } catch (error) {
            console.log("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
        // getPosts();
    }

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
                type="button"
                disabled=""
                className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70 cursor-not-allowed rounded-lg "
                onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                }
            >
                {" "}
                Add Post
            </button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-h-fit">
                    <form method="dialog" onSubmit={handleSubmit}>
                        <h3 className="font-bold text-lg flex justify-center">
                            New Post
                        </h3>
                        <button
                            className="btn"
                            onClick={() =>
                                document.getElementById("my_modal_3").close()
                            }
                        >
                            X
                        </button>
                        <label className="form-control w-full max-w-[100%] mb-3">
                            <div className="label">
                                <span className="label-text font-bold">
                                    Author ID
                                </span>
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
                                <span className="label-text font-bold">
                                    Title
                                </span>
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
                                <span className="label-text font-bold">
                                    Category
                                </span>
                            </div>
                            <select
                                className="select select-bordered"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Pick one</option>
                                <option>Software</option>
                                <option>Job's Interviews</option>
                                <option>AI </option>
                                <option>Frontend</option>
                                <option>Backend</option>
                            </select>
                        </label>
                        <label className="form-control w-full max-w-[100%] mb-3">
                            <div className="label">
                                <span className="label-text font-bold">
                                    Add cover
                                </span>
                            </div>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full max-w-[100%] mb-3"
                                multiple={false}
                                // onChange={handleFile}
                                onChange={(e) => setCover(e.target.files[0])}
                            />
                        </label>
                        <label className="form-control w-full max-w-[100%] mb-3">
                            <div className="label">
                                <span className="label-text font-bold">
                                    Read time
                                </span>
                            </div>
                            <select
                                className="select select-bordered select-xs w-full max-w-[100%] mb-3"
                                required
                                value={readTime}
                                onChange={(e) => setReadTime(e.target.value)}
                            >
                                <option>Minute</option>
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
                                <span className="label-text font-bold">
                                    Comment
                                </span>
                            </div>
                            <TextEditor
                                theme="snow"
                                className={cn(
                                    "max-h-24",
                                    styles.newBlogContent
                                )}
                                text={text}
                                setText={setText}
                                required
                                onChange={handleChange}
                            />
                        </label>
                        <div className="flex justify-end my-5 ">
                            <button className="btn btn-success " type="submit">
                                <Link to={"/"}>Send</Link>
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </dialog>
        </>
    )
}

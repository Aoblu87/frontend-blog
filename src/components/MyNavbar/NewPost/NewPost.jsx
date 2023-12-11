import { useCallback, useState } from "react"
import "react-quill/dist/quill.snow.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import TextEditor from "./TextEditor"

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

        //salvo la data in cui avviene la pubblicazione
        let date = new Date().toLocaleDateString()
        console.log(date)

        //imposto il tempo per la chiusura del modale sincronizzato con il toast
        const timeoutCloseLogin = () => {
            setTimeout(closeLogin, 2500)
        }
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
            createdAt: date,
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
                toast.success(" Login successfull!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,

                    theme: "light",
                })
                timeoutCloseLogin()
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
        } catch (error) {
            console.log("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }
    const closeModal = () => {
        setFirstName("")
        setEmail("")
        setLastName("")
        setPassword("")
        setSuccessfullRegistration(false)
        setEmailExists(false)
        document.getElementById("addArticleDialog").close()
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
                    Add Article
                </div>
                <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                    <div className="col-span-2 lg:col-span-1">
                        <div className=" relative ">
                            <input
                                type="text"
                                id="contact-form-id"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                placeholder="Author Id"
                                required
                                value={idAuthor}
                                onChange={(e) => setIdAuthor(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <div className=" relative ">
                            <input
                                type="text"
                                id="contact-form-title"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent "
                                placeholder="Title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <div className=" relative ">
                            <select
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent "
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option>Category</option>
                                <option value="Frontend">Mountain</option>
                                <option value="Backend">Lead</option>
                                <option value="AI">Boulder</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <div className=" relative ">
                            <select
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent "
                                required
                                value={readTime}
                                onChange={(e) => setReadTime(e.target.value)}
                            >
                                <option>Read Time</option>
                                <option value="1 ">1 minute</option>
                                <option value="2">2 minute</option>
                                <option value="3">3 minuti</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
                            multiple={false}
                            onChange={(e) => setCover(e.target.files[0])}
                        />
                    </div>

                    <div className="col-span-2">
                        <label className="text-gray-700">
                            <TextEditor
                                theme="snow"
                                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                text={text}
                                setText={setText}
                                required
                                onChange={handleChange}
                            />
                            {/* <textarea
                                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    id="comment"
                                    placeholder="Enter your comment"
                                    name="comment"
                                    rows="5"
                                    cols="40"
                                ></textarea> */}
                        </label>
                    </div>
                    <div className="col-span-2 text-right">
                        <button
                            type="submit"
                            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        >
                            Send
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover={false}
                theme="colored"
            />

            {/* <dialog id="my_modal_3" className="modal">
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
            </dialog> */}
        </>
    )
}

import { useCallback, useState } from "react"
import "react-quill/dist/quill.snow.css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import TextEditor from "./TextEditor"
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid"

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
                `${import.meta.env.VITE_MY_PORT}/api/blogPosts/`,
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
                    `${
                        import.meta.env.VITE_MY_PORT
                    }/api/blogPosts/${_id}/cover`,
                    {
                        method: "PATCH",
                        body: formData,
                    }
                )
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
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
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
            {/* <form onSubmit={handleSubmit}>
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
            </form> */}

            <form onSubmit={handleSubmit}>
                <div className="w-full p-12 bg-white space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
                            Add new Post
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="authorId"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Author ID
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="authorId"
                                        id="authorId"
                                        autoComplete="title"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        value={idAuthor}
                                        onChange={(e) =>
                                            setIdAuthor(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Title
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="title"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        required
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="category"
                                        name="category"
                                        autoComplete="category"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        required
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    >
                                        <option>Mountain</option>
                                        <option>Lead</option>
                                        <option>Boulder</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="readTime"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Read time
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="readTime"
                                        name="readTime"
                                        autoComplete="readTime"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        required
                                        value={readTime}
                                        onChange={(e) =>
                                            setReadTime(e.target.value)
                                        }
                                    >
                                        <option value="1 minute">1</option>
                                        <option value="2 minute">2</option>
                                        <option value="3 minute">3</option>
                                        <option value="4 minute">4</option>
                                        <option value="5 minute">5</option>
                                        <option value="6 minute">6</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Content
                                </label>
                                <div className="mt-2">
                                    <TextEditor
                                        id="content"
                                        name="content"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={""}
                                        theme="snow"
                                        // className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        text={text}
                                        setText={setText}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                        />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    multiple={false}
                                                    onChange={(e) =>
                                                        setCover(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                            </label>
                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
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
        </>
    )
}

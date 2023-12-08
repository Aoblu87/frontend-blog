import { useState } from "react"
import SignIn from "../SignIn/SignIn"

export default function SignUp(props) {
    const { id } = props
    const [author, setAuthor] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [successfullRegistration, setSuccessfullRegistration] =
        useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setLoading(true);
        const formData = {
            firstName: firstName,

            lastName: lastName,

            email: email,

            password: password,
        }

        try {
            const response = await fetch(
                `http://localhost:${import.meta.env.VITE_MY_PORT}/api/authors/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(formData),
                }
            )
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            } else {
                setSuccessfullRegistration(true)
            }

            const data = await response.json()
            setAuthor(data)
            console.log(data)
        } catch (error) {
            console.log("Error fetching data:", error)
        }
        // finally {
        //     setLoading(false)
        // }
    }

    return (
        <>
            <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="flex justify-end text-2xl">
                    <button
                        onClick={() => {
                            document.getElementById("signUp_modal").close()
                        }}
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Create a new account
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                    Already have an account ?
                    <a
                        target="_blank"
                        className="text-sm text-blue-500 underline hover:text-blue-700"
                        onClick={() => {
                            document.getElementById("signIn_modal").showModal()
                            document.getElementById("signUp_modal").close()
                        }}
                    >
                        Sign in
                    </a>
                    <dialog id="signIn_modal" className="modal">
                        <SignIn id={"signIn_modal"} />
                    </dialog>
                </span>
                <div className="p-6 mt-8">
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4 mb-2">
                            <div className=" relative ">
                                <input
                                    type="text"
                                    id="create-account-first-name"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="First name"
                                    placeholder="First name"
                                    required
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div className=" relative ">
                                <input
                                    type="text"
                                    id="create-account-last-name"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="Last name"
                                    placeholder="Last name"
                                    required
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input
                                    type="email"
                                    id="create-account-email"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className=" relative ">
                                <input
                                    type="password"
                                    id="create-account-password"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex w-full my-4">
                            <button
                                type="submit"
                                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                            >
                                Create Accout
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center mt-6">
                        <div></div>
                    </div>
                </div>
                {/* Alert success registration */}
                {successfullRegistration ? (
                    <div class="w-64 p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800">
                        <div class="w-full h-full text-center">
                            <div class="flex flex-col justify-between h-full">
                                <svg
                                    class="w-12 h-12 m-auto mt-4 text-green-500"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                                <h1>SUCCESS</h1>
                                <p class="px-6 py-2 text-gray-600 dark:text-gray-100 text-md text-bolder">
                                    We have sent a verification email to
                                    <span class="font-bold text-gray-800 dark:text-white">
                                        23722873
                                    </span>
                                    has been deleted form database.
                                </p>
                                <div class="flex items-center justify-between w-full gap-4 mt-8">
                                    <button
                                        type="button"
                                        class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </>
    )
}

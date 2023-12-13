import { useEffect, useState } from "react"
import Login from "../Login/Login"
import ConfermationEmail from "../../ConfermationEmail/ConfermationEmail"

export default function SignUp(props) {
    const { user, setUser } = props

    const [author, setAuthor] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [successfullRegistration, setSuccessfullRegistration] =
        useState(false)
    const [emailExists, setEmailExists] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setLoading(true);
        setEmailExists(false)

        //salvo la data in cui avviene la registrazione
        let date = new Date().toLocaleDateString()
        console.log(date)

        const formData = {
            firstName: firstName,

            lastName: lastName,

            email: email,

            password: password,
            createdAt: date,
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
            setEmailExists(true)
            setAuthor(data)
            if (data.token) {
                localStorage.setItem(
                    "userId",
                    data.userId ? data.userId : data.payload.id
                )
                localStorage.setItem("token", data.token)
            }
            navigate("/")
        } catch (error) {
            console.log("Error fetching data:", error)
        } finally {
            // setLoading(false)
        }
    }
    const sendVerifyEmail = async () => {
        if (successfullRegistration) {
            // const { email, firstName, LastName } = author
            try {
                const response = await fetch(
                    `http://localhost:${
                        import.meta.env.VITE_MY_PORT
                    }/api/verifyEmail/`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify({ email, _id, password }),
                    }
                )
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                const data = await response.json()
                console.log(data)
            } catch (error) {
                console.log("Error fetching data:", error)
            }
        }
    }
    useEffect(() => {
        sendVerifyEmail()
    }),
        []

    // Chiude il modale e porta gli stati al valore di default
    const closeSignUp = () => {
        setFirstName("")
        setEmail("")
        setLastName("")
        setPassword("")
        setSuccessfullRegistration(false)
        setEmailExists(false)
        document.getElementById("signUp_modal").close()
    }
    return (
        <>
            <div className="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                <div className="flex justify-end text-2xl">
                    <button onClick={closeSignUp}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
                    Create a new account
                </div>
                <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
                    Already have an account ?
                    <a
                        target="_blank"
                        className="text-sm text-blue-500 underline hover:text-blue-700 hover:cursor-pointer"
                        onClick={() => {
                            document.getElementById("login_modal").showModal()
                            document.getElementById("signUp_modal").close()
                        }}
                    >
                        Sign in
                    </a>
                    <dialog id="login_modal" className="modal">
                        <Login
                            id={"login_modal"}
                            user={user}
                            setUser={setUser}
                        />
                    </dialog>
                </span>
                <div className="flex gap-4 item-center mt-5">
                    <button
                        type="button"
                        className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                        <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mr-2"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
                        </svg>
                        Facebook
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                        onClick={() => {
                            window.location.assign(
                                "http://localhost:3030/api/auth/google"
                            )
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mr-2"
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
                        </svg>
                        Google
                    </button>
                </div>
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

                {/* Alert success registration or email already exists */}

                {successfullRegistration ? (
                    <ConfermationEmail
                        email={email}
                        closeSignUp={closeSignUp}
                    />
                ) : (
                    emailExists && (
                        <div>
                            <h3>Email already exists</h3>
                        </div>
                    )
                )}
            </div>
        </>
    )
}

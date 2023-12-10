import { useState } from "react"
import SignUp from "./Signup/SignUp"
import NewPost from "./NewPost/NewPost"
import Logo from "../../assets/logo.svg"

export default function MyNavbar(props) {
    const [login, setLogin] = useState(false)

    return (
        <>
            <div>
                <nav className="bg-white dark:bg-gray-800  shadow py-4 ">
                    <div className="px-8 mx-auto ">
                        <div className="flex items-center justify-between h-16">
                            <div className=" flex items-center">
                                <a className="flex-shrink-0" href="/">
                                    <img
                                        className="w-8 h-8"
                                        src={Logo}
                                        alt="Workflow"
                                    />
                                </a>
                                <div className="hidden md:block">
                                    <div className="flex items-baseline ml-10 space-x-4">
                                        <a
                                            className="text-gray-800  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                            href="/#"
                                        >
                                            Home
                                        </a>
                                        <a
                                            className="text-gray-300 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                            href="/#"
                                        >
                                            Gallery
                                        </a>
                                        <a
                                            className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                            href="/#"
                                        >
                                            Content
                                        </a>
                                        <a
                                            className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                                            href="/#"
                                        >
                                            Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70  rounded-lg "
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "addArticleDialog"
                                                )
                                                .showModal()
                                        }
                                    >
                                        {" "}
                                        Add Post
                                    </button>
                                    <dialog
                                        id="addArticleDialog"
                                        className="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800"
                                    >
                                        <NewPost id={"addArticleDialog"} />
                                    </dialog>{" "}
                                    {/* <div className="flex">
                                <div className="col me-5">
                                    <NewPost />
                                </div> */}
                                    {!login ? (
                                        <div className="flex items-center">
                                            <button
                                                type="button"
                                                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "signUp_modal"
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                Log In / Sign Up
                                            </button>
                                            <dialog
                                                id="signUp_modal"
                                                className="modal flex justify-center"
                                            >
                                                <SignUp id={"signUp_modal"} />
                                            </dialog>{" "}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="block">
                                                <div className="flex items-center ml-4 md:ml-6">
                                                    <div className="relative ml-3">
                                                        <div className="relative inline-block text-left">
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                                                                    id="options-menu"
                                                                >
                                                                    <svg
                                                                        width="20"
                                                                        fill="currentColor"
                                                                        height="20"
                                                                        className="text-gray-800"
                                                                        viewBox="0 0 1792 1792"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                                                                <div
                                                                    className="py-1 "
                                                                    role="menu"
                                                                    aria-orientation="vertical"
                                                                    aria-labelledby="options-menu"
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                                                                        role="menuitem"
                                                                    >
                                                                        <span className="flex flex-col">
                                                                            <span>
                                                                                Settings
                                                                            </span>
                                                                        </span>
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                                                                        role="menuitem"
                                                                    >
                                                                        <span className="flex flex-col">
                                                                            <span>
                                                                                Account
                                                                            </span>
                                                                        </span>
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="block  px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                                                                        role="menuitem"
                                                                    >
                                                                        <span className="flex flex-col">
                                                                            <span>
                                                                                Logout
                                                                            </span>
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex -mr-2 md:hidden">
                                                <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        fill="currentColor"
                                                        className="w-8 h-8"
                                                        viewBox="0 0 1792 1792"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                                                    </svg>
                                                </button>
                                            </div>{" "}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a
                                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                href="/#"
                            >
                                Home
                            </a>
                            <a
                                className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                                href="/#"
                            >
                                Gallery
                            </a>
                            <a
                                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                href="/#"
                            >
                                Content
                            </a>
                            <a
                                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                href="/#"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

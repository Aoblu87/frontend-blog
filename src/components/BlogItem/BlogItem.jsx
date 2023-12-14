import { Link } from "react-router-dom"
import UserLogo from "../BlogItem/BlogItem.jsx"

export default function BlogItem(props) {
    const { title, cover, author, _id, content, readTime } = props
    return (
        <>
            <Link to={`/blog/${_id}`}>
                <div className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-full w-60 md:w-80">
                    <img
                        src={cover}
                        alt={title}
                        className="object-cover w-full max-h-40"
                    />
                    <div className="w-full p-4 bg-white dark:bg-gray-800">
                        <p className="font-medium text-indigo-500 text-md">
                            Video
                        </p>
                        <p className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                            {title}
                        </p>
                        <p
                            className="line-clamp-3 font-light text-gray-400 dark:text-gray-300 text-md"
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        ></p>
                        <div className="flex items-center mt-4">
                            {author ? (
                                <img
                                    alt={author?.firstName}
                                    src={author?.avatar}
                                    className="mx-auto object-cover rounded-full h-10 w-10 "
                                />
                            ) : (
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
                                // className="mx-auto object-cover rounded-full h-10 w-10 "
                            )}

                            <div className="flex flex-col justify-between ml-4 text-sm">
                                <p className="text-gray-800 dark:text-white">
                                    {author?.firstName} {author?.lastName}
                                </p>
                                <p className="text-gray-400 dark:text-gray-300">
                                    {/* {createdAt}  */} 20 Gennaio 2023 -{" "}
                                    {readTime?.value} {readTime?.unit} read
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

import { Link } from "react-router-dom"

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
                            <img
                                alt={author.firstName}
                                src={author.avatar}
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                            />

                            <div className="flex flex-col justify-between ml-4 text-sm">
                                <p className="text-gray-800 dark:text-white">
                                    {author.firstName} {author.lastName}
                                </p>
                                <p className="text-gray-400 dark:text-gray-300">
                                    {/* {createdAt}  */} 20 Gennaio 2023 -{" "}
                                    {readTime.value} {readTime.unit} read
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BlogLike from "../BlogLike/BlogLike"
import Comments from "../Comments/Comments"

export default function Blog() {
    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const getPost = async () => {
        try {
            const response = await fetch(
                `http://localhost:${
                    import.meta.env.VITE_MY_PORT
                }/api/blogPosts/${id}`
            )

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            setBlog(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPost()
    }, [])
    console.log(id)
    return (
        <>
            {loading ? (
                <div className="d-flex mt-5">
                    <span className="loading loading-spinner text-info"></span>
                </div>
            ) : (
                <>
                    <div className="container mx-auto my-5">
                        <img src={blog.cover} />
                        <h1>{blog.title}</h1>

                        <div className="blog-details-container">
                            <div className="blog-details-author">
                                <div
                                    xs={"auto"}
                                    className="pe-0"
                                    key={blog.author._id}
                                >
                                    <img
                                        className="blog-author"
                                        src={blog.author.avatar}
                                    />
                                </div>

                                <div className="d-flex align-items-center">
                                    <h6>
                                        di {blog.author.firstName}{" "}
                                        {blog.author.lastName}
                                    </h6>
                                </div>
                            </div>
                            <div className="blog-details-info">
                                <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
                                <div
                                    style={{
                                        marginTop: 20,
                                    }}
                                >
                                    <BlogLike
                                        defaultLikes={["123"]}
                                        onChange={console.log}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: blog.content,
                            }}
                        ></div>
                    </div>
                </>
            )}
            {loading ? (
                <div className="d-flex mt-5">
                    <span className="loading loading-spinner text-info"></span>
                </div>
            ) : (null
                // <Comments id={id} />
            )}
        </>
    )
}

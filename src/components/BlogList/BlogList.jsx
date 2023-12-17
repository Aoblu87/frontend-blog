import { useContext, useEffect, useState } from "react"
import BlogItem from "../BlogItem/BlogItem"
import LoadingContext from "../../contexts/LoadingContext"

export default function BlogList(props) {
    const { result } = props
    const [posts, setPosts] = useState([])
    const { loading, setLoading } = useContext(LoadingContext)

    const getPosts = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_MY_PORT}/api/blogPosts`
            )

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            setPosts(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])
    // console.log(posts)
    return (
        <>
            {loading ? (
                <div className="flex mt-5">
                    <span className="loading loading-spinner text-info"></span>
                </div>
            ) : result ? (
                <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                    {result.map((post, i) => (
                        <BlogItem
                            key={`item-${i}`}
                            {...post}
                            loading={loading}
                        />
                    ))}
                </div>
            ) : (
                <div className="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                    {posts.map((post, i) => (
                        <BlogItem
                            key={`item-${i}`}
                            {...post}
                            loading={loading}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

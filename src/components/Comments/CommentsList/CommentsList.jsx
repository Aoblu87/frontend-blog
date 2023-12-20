import { useContext, useEffect, useState } from "react"
import LoadingContext from "../../../contexts/LoadingContext"

export default function CommentList(props) {
    const { id } = props
    const [comments, setComments] = useState()
    const { loading, setLoading } = useContext(LoadingContext)

    const getComments = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_MY_PORT}/api/blogPosts/${id}/comments`
            )

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json()
            setComments(data)
        } catch (error) {
            console.error("Error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getComments()
    }, [comments])
    console.log(comments)
    return (
        <>
            <div className="flex flex-col  justify-between" key={id}>
                {loading ? (
                    <div className="flex justify-center mt-5">
                        <span className="loading loading-spinner text-info"></span>
                    </div>
                ) : (
                    comments?.map((comment, i) => (
                        <>
                            <div
                                key={`item-${i}`}
                                className="flex flex-col md:flex-row justify-between"
                            >
                                <div className="flex flex-row">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={comment.author?.avatar} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col p-3">
                                        <div className="author mb-3">
                                            <h5>
                                                {comment.author?.firstName}

                                                {comment.author?.lastName}
                                            </h5>
                                        </div>
                                        <div className="comments">
                                            <p>{comment?.text}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="date p-3">25 Gennaio 2023</div>
                            </div>
                            <div className="divider"></div>
                        </>
                    ))
                )}
            </div>
        </>
    )
}

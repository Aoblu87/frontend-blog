import { useState } from "react"
import BlogList from "../BlogList/BlogList"

export default function Main(props) {
    const [query, setQuery] = useState("")
    const [result, setResult] = useState()
    const handleSearch = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(
                `http://localhost:${
                    import.meta.env.VITE_MY_PORT
                }/api/searchPost?title=${query}`
            )

            if (!response.ok) {
                throw new Error(`Errore nella richiesta: ${response.status}`)
            }

            const data = await response.json()
            console.log("Risultato della ricerca:", data)

            // Aggiorna lo stato con i risultati della ricerca
            setResult(data)
        } catch (errore) {
            console.error("Errore durante la ricerca:", errore.message)
        }
    }
    return (
        <>
            <div className="w-full p-12 bg-white">
                <div className="flex items-end justify-between mb-12 header">
                    <div className="title">
                        <p className="mb-4 text-4xl font-bold text-gray-800">
                            Lastest articles
                        </p>
                        <p className="text-2xl font-light text-gray-400">
                            All article are verified by 2 experts and valdiate
                            by the CTO
                        </p>
                    </div>
                    <div className="text-end">
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
                        >
                            <div className=" relative ">
                                <input
                                    type="text"
                                    id='"form-subscribe-Search'
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="Enter a title"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <button
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                type="submit"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                <BlogList result={result} />
            </div>
        </>
    )
}

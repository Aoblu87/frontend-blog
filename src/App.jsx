import { BrowserRouter, Route, Routes } from "react-router-dom"
import Blog from "./components/Blog/Blog"
import Footer from "./components/Footer/Footer"
import MyNavbar from "./components/MyNavbar/MyNavbar"

import { useState } from "react"
import Main from "./components/Main/Main"
import LoadingContext from "./contexts/LoadingContext"
export default function App() {
    const [loading, setLoading] = useState(true)
    return (
        <>
            <LoadingContext.Provider value={{ loading, setLoading }}>
                <BrowserRouter>
                    <MyNavbar />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/blog/:id" element={<Blog />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </LoadingContext.Provider>
        </>
    )
}

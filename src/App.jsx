import { BrowserRouter, Route, Routes } from "react-router-dom"
import Blog from "./components/Blog/Blog"
import Footer from "./components/Footer/Footer"
import Home from "./components/Main/Main"
import MyNavbar from "./components/MyNavbar/MyNavbar"

import { useState } from "react"
import LoadingContext from "./contexts/LoadingContext"
export default function App() {
    const [loading, setLoading] = useState(true)
    return (
        <>
            <LoadingContext.Provider value={{ loading, setLoading }}>
                <BrowserRouter>
                    <MyNavbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog/:id" element={<Blog />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </LoadingContext.Provider>
        </>
    )
}

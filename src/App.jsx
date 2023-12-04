import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  return (
    <>
      <BrowserRouter>
        <MyNavbar query={query} setQuery={setQuery} setResult={setResult} />
        <Routes>
          <Route path="/" element={<Home result={result} />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

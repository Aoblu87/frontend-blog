import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import MyNavbar from "./components/MyNavbar/MyNavbar";
import { useState } from "react";
export default function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  return (
    <>
      <BrowserRouter>
        <MyNavbar query={query} setQuery={setQuery} setResult={setResult} />
        <Home result={result} />
        <Footer />
        {/* <Routes>
          <Route path="/" exact element={<Home result={result} />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes> */}
      </BrowserRouter>
    </>
  );
}

import { Link } from "react-router-dom";
import NewPost from "../NewPost/NewPost";
import SignUp from "../Sign up/SignUp";

export default function MyNavbar(props) {
  const { query, setQuery, setResult } = props;
  console.log(query);
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:${
          import.meta.env.VITE_MY_PORT
        }/api/searchPost?title=${query}`
      );

      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }

      const data = await response.json();
      console.log("Risultato della ricerca:", data);

      // Aggiorna lo stato con i risultati della ricerca
      setResult(data);
    } catch (errore) {
      console.error("Errore durante la ricerca:", errore.message);
    }
  };
  return (
    <>
      <div className="navbar bg-base-100 mb-5 mx-auto">
        <div className="flex-1 ">
          <Link to={"/"} className="btn btn-ghost text-xl">
            Blog
          </Link>
        </div>
        <div className="col me-5">
          <NewPost />
        </div>
        <div className="flex-none gap-2">
          <form onSubmit={handleSearch} className="flex flex-wrap">
            <div className="form-control column-4">
              <input
                type="text"
                value={query}
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div>
              <button className="btn btn-ghost" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </div>
          </form>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                Profile
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn justify-between"
                  onClick={() =>
                    document.getElementById("signUp_modal").showModal()
                  }
                >
                  Sign up/Sign in
                </button>
                <dialog id="signUp_modal" className="modal">
                  <SignUp id={"signUp_modal"} />
                </dialog>
                <span className="badge">New</span>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

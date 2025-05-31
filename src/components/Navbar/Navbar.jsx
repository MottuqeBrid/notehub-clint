import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      {/* <li>
        <NavLink to="/calculator">Calculator</NavLink>
      </li> */}
      {user && (
        <>
          <li>
            <NavLink to="/cover-page">Cover Page</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/notes">Notes</NavLink>
          </li>
          <li>
            <NavLink to="/todos">Tasks</NavLink>
          </li>
          <li>
            <NavLink to="/links">Links</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown  lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-xl">
            NoteHub
          </Link>
        </div>
      </div>
      <div className="w-full lg:block hidden ">
        <ul className="menu menu-horizontal">{links}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <div className="flex gap-2">
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  {user?.name || "Profile"}
                  <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <button onClick={logout} className="">
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

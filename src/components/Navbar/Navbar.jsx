import { Link, NavLink, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/notes">Notes</NavLink>
      </li>
      <li>
        <NavLink to="/todos">To-dos</NavLink>
      </li>
      <li>
        <NavLink to="/links">Links</NavLink>
      </li>
      <li>
        <NavLink to="/cover-page">Cover Page</NavLink>
      </li>
      {/* <li>
        <NavLink to="/calculator">Calculator</NavLink>
      </li> */}
      {user && (
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
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
        {location.pathname !== "/search" && (
          <Link to="/search" className="btn btn-ghost btn-circle">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />{" "}
            </svg>
          </Link>
        )}
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
          <button onClick={logout} className="btn btn-primary">
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

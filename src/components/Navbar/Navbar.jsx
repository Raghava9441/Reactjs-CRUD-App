import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav navbar-dark bg-dark mb-3">
      <Link
        style={{ color: "white" }}
        className="nav-link active"
        aria-current="page"
        href="#"
        to="/"
      >
        CRUD
      </Link>
      <Link style={{ color: "white" }} className="nav-link" to="/posts">
        Posts
      </Link>
      <Link style={{ color: "white" }} className="nav-link" to="/todos">
        Todos
      </Link>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link, withRouter } from "react-router-dom";
import './Nav.css'

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Go to Different Section
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/table" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/table">
                  Table
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/grid" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/grid">
                  Grid
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/login_signup" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/login_signup">
                  Login / SignUp
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
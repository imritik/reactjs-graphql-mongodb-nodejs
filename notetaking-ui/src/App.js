import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AllNotes from "./AllNotes";
import NewNote from "./NewNote";
import EditNote from "./EditNote";
import "./App.css";
import Login from "./login";
import Profile from "./Profile";
/* global localStorage, */
function App() {
  function logout() {
    localStorage.clear();
    // this.props.history.push(`/login`);
  }
  function getemail() {
    const loggedin = "rit@gmail.com";
    if (loggedin == null) {
      console.log("logged out");
      return true;
    } else {
      console.log("logged in");

      return false;
    }
  }
  return (
    <Router>
      <div>
        <nav
          className="navbar App-header"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              NotesQL
            </Link>
          </div>

          <div className="navbar-end">
            {!getemail() && (
              <Link to="/" className="navbar-item">
                All Notes
              </Link>
            )}
            {!getemail() && (
              <Link to="/newnote" className="navbar-item">
                New Note
              </Link>
            )}
            {!getemail() && (
              <Link to="/profile" className="navbar-item">
                Profile
              </Link>
            )}
            {getemail() && (
              <Link to="/login" className="navbar-item">
                Login
              </Link>
            )}
            {!getemail() && (
              <button className="navbar-item" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </nav>

        <Route exact path="/" component={AllNotes} />
        <Route path="/newnote" component={NewNote} />
        <Route path="/note/:id" component={EditNote} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </div>
    </Router>
  );
}

export default App;

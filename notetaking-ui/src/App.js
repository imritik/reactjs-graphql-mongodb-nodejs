import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AllNotes from "./AllNotes";
import NewNote from "./NewNote";
import EditNote from "./EditNote";
import "./App.css";
import Login from "./login";
const loggedin = localStorage.getItem("token");
function App() {
  function logout() {
    localStorage.clear();
    // this.props.history.push(`/login`);
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
            <Link to="/" className="navbar-item">
              All Notes
            </Link>

            <Link to="/newnote" className="navbar-item">
              New Note
            </Link>
            {!loggedin && (
              <Link to="/login" className="navbar-item">
                Login
              </Link>
            )}
            {loggedin && (
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
      </div>
    </Router>
  );
}

export default App;

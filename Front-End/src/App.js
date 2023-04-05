import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Pages";
import Home from "./Pages/Home";
import Notes from "./Pages/Notes";
import Explore from "./Pages/Explore";
import Profile from "./Pages/Profile";
import Contact from "./Pages/Contact";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Settings from "./Pages/Settings";
import NotFound from "./Pages/404";

export default function App() {
  const isLoggedin = useSelector((state) => state.isLoggedin);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route
            exact
            path="/"
            element={isLoggedin === false ? <Navigate to="/login" /> : <Home />}
          />
          <Route
            exact
            path="/notes"
            element={
              isLoggedin === false ? <Navigate to="/login" /> : <Notes />
            }
          />
          <Route
            exact
            path="/explore"
            element={
              isLoggedin === false ? <Navigate to="/login" /> : <Explore />
            }
          />
          <Route
            exact
            path="/profile/:id"
            element={
              isLoggedin === false ? <Navigate to="/login" /> : <Profile />
            }
          />
          <Route
            exact
            path="/contact"
            element={
              isLoggedin === false ? <Navigate to="/login" /> : <Contact />
            }
          />
          <Route
            exact
            path="/settings"
            element={
              isLoggedin === false ? <Navigate to="/login" /> : <Settings />
            }
          />
        </Route>
        <Route
          exact
          path="/register"
          element={isLoggedin === false ? <Register /> : <Navigate to="/" />}
        />
        <Route
          exact
          path="/login"
          element={isLoggedin === false ? <Login /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

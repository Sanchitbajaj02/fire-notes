import "./Styles/App.css";
import React, { useEffect } from "react";
import { authenticatedUser } from "./@types/index.d";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./Firebase/firebase.config";

import HomeComponent from "./Components/HomeComponent";
import NotesComponent from "./Components/NotesComponent";
import NotFound from "./Components/NotFound";

import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";

function App() {
  const select: authenticatedUser = useSelector(
    (state: any) => state.authSlicer
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/not-found" element={<NotFound />} />

        {select.uid && select.emailID && (
          <Route path="/notes" element={<NotesComponent />} />
        )}

        <Route path="*" element={<Navigate to="/not-found" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

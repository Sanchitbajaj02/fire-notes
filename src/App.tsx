import React, { useEffect } from "react";
import "./Styles/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./Firebase/firebase.config";
import HomeComponent from "./Components/HomeComponent";
import NotesComponent from "./Components/NotesComponent";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";

function App() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/notes" element={<NotesComponent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

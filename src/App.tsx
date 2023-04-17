import React from "react";
import "./Styles/App.css";

import NotesContainer from "./Components/NotesContainer";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <section className="container-wrapper">
      <Sidebar />
      <NotesContainer />
    </section>
  );
}

export default App;

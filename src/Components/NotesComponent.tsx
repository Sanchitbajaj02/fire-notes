import React from "react";
import NotesContainer from "./Notes/NotesContainer";
import NewNoteBar from "./Notes/NewNoteBar";

function NotesComponent() {
  return (
    <section className="container-wrapper">
      <NewNoteBar />
      <NotesContainer />
    </section>
  );
}

export default NotesComponent;

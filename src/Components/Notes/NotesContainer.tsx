import React from "react";
import Note from "./Note";

function NotesContainer() {
  return (
    <div className="note-container">
      <h2>Notes</h2>
      <div className="note-container_notes custom-scroll">{/* <Note /> */}</div>
    </div>
  );
}

export default NotesContainer;

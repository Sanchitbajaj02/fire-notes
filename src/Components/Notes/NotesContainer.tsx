import "./notes.css";
import React, { useEffect } from "react";
import Note from "./Note";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../Redux/noteSlice";

import {
  authenticatedUser,
  NotesState,
  SingleNote,
} from "../../@types/index.d";
import { getNotesFromDBByuid } from "../../Firebase/firebaseFunctions";

function NotesContainer() {
  const notesSelector: NotesState = useSelector(
    (state: any) => state.notesSlicer
  );

  const authSelector: authenticatedUser = useSelector(
    (state: any) => state.authSlicer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getNotesFromDBByuid(authSelector.uid)
      .then((resp: SingleNote[]) => {
        console.log(resp);
        if (resp.length > 0) {
          dispatch(getNotes(resp));
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, [authSelector.uid, dispatch]);

  return (
    <div className="note-container">
      <h2
        style={{
          fontSize: "2rem",
        }}
      >
        Notes
      </h2>
      <div className="note-container_notes custom-scroll">
        {notesSelector.notes.length > 0 ? (
          notesSelector.notes.map((note: SingleNote, index: number) => {
            return <Note key={index} note={note} />;
          })
        ) : (
          <p
            style={{
              fontSize: "2rem",
            }}
          >
            No Notes present
          </p>
        )}

        {/* <Note /> */}
      </div>
    </div>
  );
}

export default NotesContainer;

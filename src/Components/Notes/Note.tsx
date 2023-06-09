import React from "react";

import { SingleNote } from "../../@types/index.d";
import { useDispatch } from "react-redux";
import { deleteNote } from "../../Redux/noteSlice";
import { deleteNoteFromDB } from "../../Firebase/firebaseFunctions";

function Note({ note }: { note: SingleNote }) {
  const dispatch = useDispatch();

  const formatDate = (value: any) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let hrs: any = date.getHours();
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs ? hrs : "12";
    hrs = hrs > 12 ? (hrs = 24 - hrs) : hrs;

    let min: any = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const deleteANote = (id: string) => {
    if (id !== "" && id !== undefined) {
      console.log(id);
      deleteNoteFromDB(id)
        .then((resp) => {
          // console.log(resp);
          if (resp) {
            dispatch(deleteNote(id));
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <input type="text" defaultValue={note.noteTitle} className="note-title" />
      <hr color="black" />
      <textarea
        className="note-description"
        defaultValue={note.noteDescription}
        onChange={(event) => console.log("update")}
      />
      <div className="note-footer">
        <p>{formatDate(note.createdAt)}</p>

        <button
          type="reset"
          className="note-delete-button"
          onClick={() => deleteANote(!!note.id ? note.id : "")}
        >
          <i className="fa-solid fa-trash fa-lg"></i>
        </button>
      </div>
    </div>
  );
}

export default Note;

import React from "react";

import { SingleNote } from "../../@types/index.d";

let timer: number = 500,
  timeout: any;
function Note({ note }: { note: SingleNote }) {
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

  const debounce = (func: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateText = (text: string, id: string) => {
    // debounce(() => props.updateText(text, id));
  };

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      <textarea
        className="note_text"
        defaultValue={note.noteTitle}
        onChange={(event) => console.log("update")}
      />
      <div className="note_footer">
        <p>{formatDate(note.createdAt)}</p>
        {/* <img
          src={deleteIcon}
          alt="DELETE"
          
        /> */}
        <button onClick={() => console.log("delete")}>delete</button>
      </div>
    </div>
  );
}

export default Note;

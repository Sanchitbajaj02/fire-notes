import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addNoteToDB, deleteNoteFromDB } from "../Firebase/firebaseFunctions";

import { SingleNote, NotesState } from "../@types/index";

const initialState = {
  notes: [] as NotesState["notes"],
};

const addNote = (
  state: NotesState = initialState,
  action: PayloadAction<SingleNote>
) => {
  const tempNote = action.payload;

  addNoteToDB(tempNote)
    .then((resp: any) => {
      console.log(resp);

      state.notes.push(resp);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

const deleteNote = (
  state: NotesState = initialState,
  action: PayloadAction<string>
) => {
  const tempNoteID = action.payload;

  deleteNoteFromDB(tempNoteID)
    .then((resp) => {
      console.log(resp);
      state.notes = state.notes.filter((note) => note.id !== tempNoteID);
    })
    .catch((err: Error) => {
      console.log(err);
    });
};

const notesSlice = createSlice({
  name: "notesslice",
  initialState,
  reducers: {
    addNote,
    deleteNote,
  },
});

export default notesSlice.reducer;

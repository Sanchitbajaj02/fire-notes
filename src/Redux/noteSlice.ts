import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { SingleNote, NotesState } from "../@types/index";

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notesslice",
  initialState,
  reducers: {
    getNotes(_, action: PayloadAction<SingleNote[]>) {
      return {
        notes: action.payload,
      };
    },
    addNote(
      state: NotesState = initialState,
      action: PayloadAction<SingleNote>
    ) {
      state.notes.push(action.payload);
      return state;
    },
    deleteNote(
      state: NotesState = initialState,
      action: PayloadAction<string>
    ) {
      state.notes.filter((note) => note.uid === action.payload);

      console.log(state.notes);
      return state;
    },
    updateNote(
      state: NotesState = initialState,
      action: PayloadAction<SingleNote>
    ) {
      // write the state logic to replace the note in the state where it matches with the action.payload.uid
    },
  },
});

// for dispatch
export const { getNotes, addNote, deleteNote } = notesSlice.actions;

// for configureStore
export default notesSlice.reducer;

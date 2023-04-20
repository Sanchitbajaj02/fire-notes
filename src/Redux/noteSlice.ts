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
    getNotes(
      state: NotesState = initialState,
      action: PayloadAction<SingleNote[]>
    ) {
      state.notes = action.payload;
      return state;
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
      const id = action.payload;

      const tempState = state.notes.filter((note) => note.id !== id);

      console.log(tempState);
      state.notes = tempState;
    },
    updateNote(
      state: NotesState = initialState,
      action: PayloadAction<SingleNote>
    ) {
      // write the state logic to replace the note in the state where it matches with the action.payload.uid
    },

    emptyNotes(state: NotesState = initialState) {
      state.notes = [];
    },
  },
});

// for dispatch
export const { getNotes, addNote, deleteNote, emptyNotes } = notesSlice.actions;

// for configureStore
export default notesSlice.reducer;

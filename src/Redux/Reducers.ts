import { createSlice } from "@reduxjs/toolkit";

export interface NotesState {
  notes: string[];
}

const notesSlice = createSlice({
  name: "notesslice",
  initialState: {
    notes: [] as NotesState["notes"],
  },
  reducers: {
    showNotes(state, action) {},
    createNote(state, action) {},
    deleteNote(state, action) {},
  },
});

export default notesSlice.reducer;

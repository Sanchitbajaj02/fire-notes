export type UserData = {
  emailID: string;
  password: string;
};

export type authenticatedUser = {
  id: string;
  uid: string;
  emailID: string;
};

export type SingleNote = {
  id: string;
  uid: string;
  noteTitle: string;
  noteDescription: string;
  createdAt: string;
};

export interface NotesState {
  notes: SingleNote[];
}

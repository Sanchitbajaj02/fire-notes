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
  id?: string;
  uid: string;
  noteTitle: string;
  noteDescription: string;
  color: string;
  createdAt: string;
};

export type NotesState = {
  notes: SingleNote[];
};

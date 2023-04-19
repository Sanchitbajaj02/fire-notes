export type UserDataType = {
  emailID?: string;
  password?: string;
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

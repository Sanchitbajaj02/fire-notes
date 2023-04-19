import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { collection, doc, addDoc, getDoc, deleteDoc } from "firebase/firestore";

import { db, auth } from "./firebase.config";
import { UserDataType, SingleNote } from "../@types/index.d";

import { encodePassword, decodePassword } from "./auth";

const userRegister = async (userData: UserDataType) => {
  try {
    if (userData?.emailID === undefined || userData?.password === undefined) {
      throw new Error("Username is required");
    }
    const signUpResult = await createUserWithEmailAndPassword(
      auth,
      userData?.emailID,
      userData?.password
    );

    if (signUpResult.user) {
      const addDocRef = collection(db, "users");

      const hashPass = await encodePassword(userData?.password);

      if (hashPass instanceof Error) {
        throw new Error(hashPass.message);
      }

      const addSnapshot = await addDoc(addDocRef, {
        emailID: userData?.emailID,
        password: hashPass,
        uid: signUpResult.user.uid,
      });

      if (addSnapshot && addSnapshot.id) {
        return {
          id: addSnapshot.id,
          uid: signUpResult.user.uid,
          emailID: signUpResult.user.email,
        };
      }
    }
  } catch (error) {
    console.log(error);
    // IN_PROGRESS: add return after testing
  }
};

const userLogin = async (userData: UserDataType) => {
  try {
    if (userData?.emailID === undefined || userData?.password === undefined) {
      throw new Error("Username is required");
    }
    const signInResult = await signInWithEmailAndPassword(
      auth,
      userData?.emailID,
      userData?.password
    );

    if (signInResult.user) {
      const docRef = doc(db, "users", signInResult.user.uid);
      const docSnapshot = await getDoc(docRef);

      const hashedPass = docSnapshot.data()?.password;

      const matchedResult = await decodePassword(
        userData?.password,
        hashedPass
      );

      if (!(matchedResult instanceof Error)) {
        if (docSnapshot && docSnapshot.exists()) {
          return {
            id: docSnapshot.id,
            uid: signInResult.user.uid,
            emailID: signInResult.user.email,
          };
        }
      }
    }
  } catch (error) {
    console.log(error);
    // IN_PROGRESS: add return after testing
  }
};

const googlePopUpSignin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const signInResult = await signInWithPopup(auth, provider);

    if (signInResult.user) {
      const docRef = doc(db, "users", signInResult.user.uid);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot && docSnapshot.exists()) {
        return {
          id: docSnapshot.id,
          uid: signInResult.user.uid,
          emailID: signInResult.user.email,
        };
      } else {
        const addDocRef = collection(db, "users");

        const addSnapshot = await addDoc(addDocRef, {
          emailID: signInResult.user.email,
          password: "",
          uid: signInResult.user.uid,
        });

        if (addSnapshot && addSnapshot.id) {
          return {
            id: addSnapshot.id,
            uid: signInResult.user.uid,
            emailID: signInResult.user.email,
          };
        }
      }
    }
  } catch (error) {
    console.log(error);
    // IN_PROGRESS: add return after testing
  }
};

const googleSignout = () => {
  return signOut(auth);
};

const addNoteToDB = async (tempNote: SingleNote) => {
  try {
    const docRef = collection(db, "notes");

    const addSnapshot = await addDoc(docRef, {
      tempNote,
    });

    if (addSnapshot && addSnapshot.id) {
      return {
        ...tempNote,
        id: addSnapshot.id,
      };
    }
  } catch (error) {
    console.log(error);
    // IN_PROGRESS: add return after testing
  }
};

const deleteNoteFromDB = async (tempNoteID: string) => {
  try {
    const docRef = doc(db, "notes", tempNoteID);

    await deleteDoc(docRef);
  } catch (error) {
    console.log(error);
    // IN_PROGRESS: add return after testing
  }
};

// const getNotesFromDBByuid = async (uid: string) => {};

export {
  userRegister,
  userLogin,
  googlePopUpSignin,
  googleSignout,
  addNoteToDB,
  deleteNoteFromDB,
};

/*

Table: users

- emailID: string
- password: string
- uid: string
- id: string (primary)

Table: notes

- id: string (primary)
- uid: string (foreign key)
- noteTitle: string
- noteDescription: string
- createdAt: string

*/

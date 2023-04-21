import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  collection,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

import { db, auth } from "./firebase.config";
import { UserData, authenticatedUser, SingleNote } from "../@types/index.d";

const userRegister = async (userData: UserData): Promise<authenticatedUser> => {
  try {
    if (userData?.emailID === undefined || userData?.password === undefined) {
      throw new Error("Fields are required");
    }
    const signUpResult = await createUserWithEmailAndPassword(
      auth,
      userData?.emailID,
      userData?.password
    );

    if (signUpResult.user) {
      const addDocRef = collection(db, "users");

      const addSnapshot = await addDoc(addDocRef, {
        emailID: signUpResult.user.email,
        uid: signUpResult.user.uid,
      });

      if (addSnapshot && addSnapshot.id) {
        return {
          id: addSnapshot.id,
          uid: signUpResult.user.uid,
          emailID: signUpResult.user.email ? signUpResult.user.email : "",
        };
      }
    }
  } catch (error: any) {
    console.log(error);
    alert(error.message);
    // IN_PROGRESS: add return after testing
    // return error;
  }

  return {
    id: "",
    uid: "",
    emailID: "",
  };
};

const userLogin = async (userData: UserData): Promise<authenticatedUser> => {
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

      console.log("line 70", docSnapshot.id);

      if (docSnapshot.id) {
        return {
          id: docSnapshot.id,
          uid: signInResult.user.uid,
          emailID: signInResult.user.email ? signInResult.user.email : "",
        };
      }
    }
  } catch (error: any) {
    console.log(error);
    alert(error.message);

    // IN_PROGRESS: add return after testing
  }

  return {
    id: "",
    uid: "",
    emailID: "",
  };
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

const addNoteToDB = async (
  tempNote: SingleNote
): Promise<{
  id: string;
  status: boolean;
}> => {
  try {
    const docRef = collection(db, "notes");

    const addSnapshot = await addDoc(docRef, {
      ...tempNote,
    });

    if (addSnapshot && addSnapshot.id) {
      return {
        id: addSnapshot.id,
        status: true,
      };
    }
  } catch (error) {
    console.log(error);
    // IN_PROGRESS: add return after testing
  }
  return {
    id: "",
    status: false,
  };
};

const deleteNoteFromDB = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, "notes", id);

    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.log(error);
    // IN_PROGRESS: add return after testing
  }
  return false;
};

const getNotesFromDBByuid = async (uid: string) => {
  try {
    // const docRef = doc(db, "notes", uid);

    // const docSnapshot = await getDoc(docRef);

    // if (docSnapshot && docSnapshot.exists()) {
    //   console.log(docSnapshot.data());
    //   return {
    //     ...docSnapshot.data(),
    //   };
    // }

    let notesArray: SingleNote[] = [];

    const docRef = collection(db, "notes");

    const docSnapshot = await getDocs(docRef);

    if (docSnapshot && docSnapshot.docs.length > 0) {
      docSnapshot.forEach((doc) => {
        // console.log(doc.data());

        if (doc.data().uid === uid) {
          const tempNote: SingleNote = {
            id: doc.id,
            uid: doc.data().uid,
            noteTitle: doc.data().noteTitle,
            noteDescription: doc.data().noteDescription,
            createdAt: doc.data().createdAt,
            color: doc.data().color,
          };

          notesArray.push(tempNote);
        }
      });

      return notesArray;
    }
  } catch (error) {
    console.log(error);
    // IN_PROGRESS: add return after testing
  }

  return [];
};

export {
  userRegister,
  userLogin,
  googlePopUpSignin,
  googleSignout,
  addNoteToDB,
  deleteNoteFromDB,
  getNotesFromDBByuid,
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

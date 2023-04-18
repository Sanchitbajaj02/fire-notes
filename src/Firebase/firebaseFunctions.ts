import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { collection, doc, addDoc, getDoc } from "firebase/firestore";

import { db, auth } from "./firebase.config";
import { UserDataType } from "../@types/index.d";

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

      const hashPass = encodePassword(userData?.password);

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

      if (docSnapshot && docSnapshot.exists() && decodePassword(hashedPass)) {
        return {
          id: docSnapshot.id,
          uid: signInResult.user.uid,
          emailID: signInResult.user.email,
        };
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

export { userRegister, userLogin, googlePopUpSignin, googleSignout };

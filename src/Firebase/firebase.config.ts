// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // personal creds
  apiKey: "AIzaSyCQ2NSPUttMSaRnWXsKesyKYr9IIbmitI0",
  authDomain: "news-app-ca6da.firebaseapp.com",
  projectId: "news-app-ca6da",
  storageBucket: "news-app-ca6da.appspot.com",
  messagingSenderId: "827071507608",
  appId: "1:827071507608:web:42ea3d2a136988c20bb4ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export { app, auth, db };

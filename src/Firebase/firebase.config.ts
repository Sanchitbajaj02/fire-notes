// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   // personal creds
//   apiKey: "AIzaSyCQ2NSPUttMSaRnWXsKesyKYr9IIbmitI0",
//   authDomain: "news-app-ca6da.firebaseapp.com",
//   projectId: "news-app-ca6da",
//   storageBucket: "news-app-ca6da.appspot.com",
//   messagingSenderId: "827071507608",
//   appId: "1:827071507608:web:42ea3d2a136988c20bb4ed",
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFPLlPSUdsgaXz460fikj41KGdLSEen-4",
  authDomain: "fire-notes-cc0d4.firebaseapp.com",
  projectId: "fire-notes-cc0d4",
  storageBucket: "fire-notes-cc0d4.appspot.com",
  messagingSenderId: "67862786672",
  appId: "1:67862786672:web:ac6d87773586073ad8fab5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

export { app, auth, db };

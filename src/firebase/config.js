// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATI4utkUbGw_NJVWctG_Rttsz7D3jI4go",
  authDomain: "journalapp-72c28.firebaseapp.com",
  projectId: "journalapp-72c28",
  storageBucket: "journalapp-72c28.appspot.com",
  messagingSenderId: "236109660019",
  appId: "1:236109660019:web:b67edb21b1ac4abe61cf06"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );

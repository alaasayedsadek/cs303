// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAohYA7Uhd7KCgM8YEWjxkRSeUsjgV1aqU",
  authDomain: "mooo-57e37.firebaseapp.com",
  projectId: "mooo-57e37",
  storageBucket: "mooo-57e37.appspot.com",
  messagingSenderId: "192720078366",
  appId: "1:192720078366:web:fb8b54794a1cb629ba900f",
  measurementId: "G-3XPSC1BDLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig,);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

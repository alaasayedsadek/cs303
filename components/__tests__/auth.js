import { auth,db } from "./Config";
import {
  onAuthStateChanged,//////////////////////////////////
  signInWithEmailAndPassword,// login
  createUserWithEmailAndPassword, // signup
  sendPasswordResetEmail, /// change pass
  confirmPasswordReset, // change pass
  signInWithCredential,//////////////////////////
  FacebookAuthProvider, // login facebook
} from "firebase/auth";
import { collection,doc, setDoc } from "firebase/firestore";
// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}
async function forgetPassword(email) {
  await sendPasswordResetEmail(auth,email)
}

export { register, login,forgetPassword };
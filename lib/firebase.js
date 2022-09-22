import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyD-zIDFeiNN3SaRKVC8oPIqv9SqFwIJMUk",

  authDomain: "nextfire-89925.firebaseapp.com",

  projectId: "nextfire-89925",

  storageBucket: "nextfire-89925.appspot.com",

  messagingSenderId: "493084933316",

  appId: "1:493084933316:web:26ecec16124f4b0513dd91",
};
//const app = initializeApp(firebaseConfig)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
// Firestore user structure
// UID, Email, Name, Username, authProvider

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(
      collection(firestore, "users"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(doc(firestore, "users"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        userName: "",
        authProvider: "google",
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export default async function userNameAvailabe(username) {
  try {

    if (!username || username.length === 0) {
      return false;
    }

    const q = query(
      collection(firestore, "users"),
      where("userName", "==", username)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 1) {
      console.log("Returned length = " + docs.docs.length + " Value " + false);
      return false;
    } else if (docs.docs.length === 0) {
      console.log("Returned length = " + docs.docs.length + " Value " + true);
      return true;
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
// const userNameAvailable = async (username) => {
//   try {
//     const q = query(
//       collection(firestore, "users"),
//       where("userName", "==", username)
//     );
//     const docs = await getDocs(q);
//     if (docs.docs.length === 1) {
//        console.log("Returned length = " + docs.docs.length + " Value " + false);
//       return false;
//     } else if (docs.docs.length === 0) {
//        console.log("Returned length = " + docs.docs.length + " Value " + true);
//       return true;
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const addUserName = async (username) => {
//   try {
//     await updateDoc(collection (firestore, "users", ))
//   }
// }

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  firestore,
  signInWithGoogle,
  logInWithEmailAndPassword,
  logout,
  googleProvider,
};

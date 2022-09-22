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
  getDoc,
  collection,
  where,
  addDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useState } from "react";
import { userNameAtom, userAtom } from "./atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

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

// const userNameState = useRecoilValue(userNameAtom);
// const userState = useRecoilValue(userAtom);
// const setUserState = useSetRecoilState(userAtom);
// const setUserNameState = useSetRecoilState(userNameAtom)

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const dbRef = collection(firestore, "users");
    const q = query(
      collection(firestore, "users"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        userName: "",
        authProvider: "google",
      }).then(() => {
        console.log("The user document has been created successfully");
      });
      return true;
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
      return false;
    } else if (docs.docs.length === 0) {
      return true;
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
export async function updateUserName(username) {
  const user = auth.currentUser;
  const setUserNameState = useSetRecoilState(userNameAtom);
  const docRef = doc(firestore, "users", user.uid);
  try {
    await updateDoc(docRef, { userName: username });
    const q = query(
      collection(firestore, "users"),
      where("uid", "==", user.uid),
      where("userName", "==", username)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 1) {
      setUserNameState(username);
      return true;
    } else if (docs.docs.length === 0) {
      return false;
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
const logInWithEmailAndPassword = async (email, password) => {
  const setUserState = useSetRecoilState(userAtom);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    setUserState(true);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  const setUserState = useSetRecoilState(userAtom);
  signOut(auth);
  setUserState(false);
};
export {
  auth,
  firestore,
  signInWithGoogle,
  logInWithEmailAndPassword,
  logout,
  googleProvider,
};

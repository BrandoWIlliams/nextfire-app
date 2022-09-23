import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { auth, firestore } from "./firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { userNameAtom, userAtom } from "../lib/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

// Custom hook to read  auth record and user profile doc
export function Authstate() {
  const userNameState = useRecoilValue(userNameAtom);
  const userState = useRecoilValue(userAtom);
  const setUserState = useSetRecoilState(userAtom);
  const setUserNameState = useSetRecoilState(userNameAtom);
}

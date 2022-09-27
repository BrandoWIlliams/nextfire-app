import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logout, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import { getAuth } from "firebase/auth";
import { UserContext } from "../lib/context";
import { signOut } from "firebase/auth";
import { userNameAtom, userAtom } from "../lib/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function Navbar() {
  const router = useRouter();
  // const [user, loading, error] = useAuthState(auth);
  const userState = useRecoilValue(userAtom);
  const userNameState = useRecoilValue(userNameAtom);
  const setUserNameState = useSetRecoilState(userNameAtom);
  const setUserState = useSetRecoilState(userAtom);
  const [loggedIn, setloggedIn] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }
  }, [auth, userState]);
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Feed</button>
          </Link>
        </li>

        {/* User is signed in and has a username */}
        {/* {username && user ? (
          <div>
            <li className="push-left flex">
              <Link href="/admin">
                <button className="btn-blue"> Write Posts</button>
              </Link>

              <button
                className="btn-blue"
                onClick={() => {
                  logout(auth);
                  console.log(user);
                }}
              >
                Logout
              </button>
            </li>
            <li>
              <Link href={"/${username}"}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </div>
        ) : ( */}
        {loggedIn ? (
          <button
            className="btn-blue"
            onClick={() => {
              signOut(auth);
              setUserState(false);
              // logout(auth);
              console.log(auth);
            }}
          >
            Logout{" "}
          </button>
        ) : (
          <button
            className="btn-blue"
            onClick={() => {
              console.log(auth.currentUser);
              router.push("/enter");
            }}
          >
            Login
          </button>
        )}
        <button
          className="btn-blue"
          onClick={() => {
            console.log(auth);
          }}
        >
          auth state
        </button>
        <button
          className="btn-blue"
          onClick={() => {
            console.log(userNameState);
          }}
        >
          user nam state
        </button>
        {/* {userState ? (
          <button
            className="btn-blue"
            onClick={() => {
              signOut(auth);
            }}
          >
            logout
          </button>
        ) : null} */}

        {/* User is not signed in or has not created a username */}
      </ul>
    </nav>
  );
}

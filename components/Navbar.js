import Link from "next/link";
import React, { useEffect } from "react";
import { logout, auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Navbar() {
  const router = useRouter();
  // const [user, loading, error] = useAuthState(auth);
  const { user, username } = useContext(UserContext);

  // useEffect(() => {
  //   if (loading) {
  //     return;
  //   }

  //   if (user) router.push("/index");
  // }, [user, loading]);
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">Feed</button>
          </Link>
        </li>

        {/* User is signed in and has a username */}
        {username && user ? (
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
        ) : (
          <button
            className="btn-blue"
            onClick={
              user
                ? () => {
                    logout(auth);
                    router.push("enter");
                  }
                : () => router.push("/enter")
            }
          >
            {user ? "Return?" : "LogIn"}
          </button>
        )}

        {/* User is not signed in or has not created a username */}
      </ul>
    </nav>
  );
}

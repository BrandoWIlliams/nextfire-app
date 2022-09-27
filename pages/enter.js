import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { UserContext } from "../lib/context";
import UsernameForm from "../components/UsernameForm";
import Login from "../components/Login";
import { auth } from "../lib/firebase";
import Register from "../components/Register";
import { useRouter } from "next/router";
import { userNameAtom, userAtom } from "../lib/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getAuth } from "firebase/auth";

export default function EnterPage() {
  const [register, setRegister] = useState(false);
  const userNameState = useRecoilValue(userNameAtom);
  const setUserState = useSetRecoilState(userAtom);
  const auth = getAuth();
  const router = useRouter();
  const userState = useRecoilValue(userAtom);
  const [userNameRequired, setUserNameRequired] = useState(null);
  const [loginRequired, setLoginRequired] = useState(null);
  useEffect(() => {
    if (userNameState.length == 0) {
      setUserNameRequired(true);
    } else if (userNameState.length > 0) {
      setUserNameRequired(false);
    }
    if (auth.currentUser == null) {
      setLoginRequired(true);
    } else {
      setLoginRequired(false);
    }
  }, [userState, userNameState]);

  return (
    <main>
      {loginRequired ? (
        <div className="container mx-auto  ">
          <div className="flex content-center items-center justify-center h-full">
            <button
              onClick={() => {
                setUserState(true);
              }}
            ></button>
            {register ? <Register /> : <Login />}
          </div>
          <div className=" ">
            <div className="text-center mt-2">
              <a
                href="/index"
                onClick={(e) => {
                  e.preventDefault();
                  setRegister(!register);
                }}
                className="text-gray-200 hover:text-blue-400"
              >
                <h3>
                  {register
                    ? "Login to an existing account instead"
                    : "Create new account"}
                </h3>
              </a>
            </div>
          </div>
        </div>
      ) : userNameRequired ? (
        <UsernameForm />
      ) : (
        router.push("/")
      )}
      {/* {!loginRequired && userNameRequired ? (
        <UsernameForm />
      ) : !loginRequired && !userNameRequired ? (
        <div>
          {" "}
          <h1>Nothing needed</h1>{" "}
        </div>
      ) : (
        <div className="container mx-auto  ">
          <div className="flex content-center items-center justify-center h-full">
            {register ? <Register /> : <Login />}
          </div>
          <div className=" ">
            <div className="text-center mt-2">
              <a
                href="/index"
                onClick={(e) => {
                  e.preventDefault();
                  setRegister(!register);
                }}
                className="text-gray-200 hover:text-blue-400"
              >
                <h3>
                  {register
                    ? "Login to an existing account instead"
                    : "Create new account"}
                </h3>
              </a>
            </div>
          </div>
        </div>
      )} */}
    </main>
  );
}

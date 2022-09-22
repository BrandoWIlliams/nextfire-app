import React, { useEffect, useState } from "react";

import { useContext } from "react";
import { UserContext } from "../lib/context";
import UsernameForm from "../components/UsernameForm";
import Login from "../components/Login";

import { auth } from "../lib/firebase";
import Register from "../components/Register";

export default function EnterPage() {
  const { user, username } = useContext(UserContext);
  const [register, setRegister] = useState(false);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <>User + username</>
        )
      ) : (
        <div className="container mx-auto  ">
          <div className="flex content-center items-center justify-center h-full">
            {register ? <Register /> : <Login />}
          </div>
          <div className=" ">
            <div className="text-center">
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
      )}
    </main>
  );
}

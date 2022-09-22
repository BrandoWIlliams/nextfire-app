import React, { useCallback, useEffect, useState, useContext } from "react";
import { UserContext } from "../lib/context";
import { pp } from "../public/Images/profile2.jpg";
import Image from "next/image";
import userNameAvailable from "../lib/firebase";
import debounce from "lodash/debounce";

export default function UsernameForm() {
  const { user, username } = useContext(UserContext);
  const [userName, setuserName] = useState("");
  const [valid, setValid] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setValid(userNameAvailable(userName));
      console.log(valid);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [userName]);

  // const checkUsername = useCallback(
  //   debounce(function () {
  //     userNameAvailable(userName);
  //   }, 500),
  //   []
  // );
  // const handleChange = (e) => {
  //   setuserName(e.target.value);
  //   checkUsername(e.target.value);
  // };

  return (
    <div class="main" className=" flex justify-center">
      {/* card */}
      <div
        class="card"
        className=" bg-gray-300 backdrop-blur-sm bg-opacity-20 flex flex-col items-center justify-center p-4 shadow-lg rounded-2xl xl:w-1/2"
      >
        <div className="p-5">
          <h1 className="text-white text-center text-xl">
            One last thing... <br />
            Enter a username <br /> You can use to login in the future
          </h1>
        </div>
        <div className="relative w-full mb-3 pt-5">
          <div class="relative border border-gray-400 rounded-lg">
            <input
              id="name"
              name="name"
              type="text"
              class="w-full  text-white placeholder-transparent  bg-white bg-opacity-10  peer focus:outline-none "
              placeholder="Name"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              autoComplete="off"
            />
            <label
              for="name"
              className="absolute left-0 pl-2 -top-7 text-white font-bold text-md transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-white peer-focus:text-md"
            >
              Username:
            </label>
          </div>
        </div>
        <div>
          {valid ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#32CD32"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ff0000"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <button className="mt-5">Finish</button>
      </div>
    </div>
  );
}

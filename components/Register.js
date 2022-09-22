import React, { useState } from "react";
import { logInWithEmailAndPassword, signInWithGoogle } from "../lib/firebase";
import google from "../public/Images/google.svg";
import github from "../public/Images/github.svg";
import Image from "next/image";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState({ value: "", show: false });
  const [password2, setPassword2] = useState({ value: "", show: false });
  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
  });
  return (
    <div className="xl:w-2/4  sm:w-full ">
      <div className="relative flex flex-col min-w-0  w-full shadow-lg rounded-xl bg-gray-300 bg-opacity-10 ">
        <div className="rounded-t mb-0 px-6 py-6 ">
          <div className="text-center mb-3">
            <h6 className="text-white text-sm font-bold">Sign in with</h6>
          </div>
          <div className="btn-wrapper flex place-content-evenly">
            <button
              className="bg-gray-300 hover:bg-gray-100 text-gray-600  px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              <div className="mr-3">
                <Image src={github} className="" width="30" height="30" />
              </div>
              Github
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={signInWithGoogle}
            >
              <div className="mr-3">
                <Image src={google} className="" width="30" height="30" />
              </div>
              Google
            </button>
          </div>
          <hr className="mt-6 border-b-1 border-gray-400" />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <div className="text-white text-lg text-center mb-3 font-bold ">
            <small>Enter your credentials to create your account</small>
          </div>

          <div className="relative border border-gray-400 rounded-lg mt-10">
            <input
              id="name"
              name="name"
              type="email"
              className="w-full  text-white placeholder-transparent  bg-white bg-opacity-10  peer focus:outline-none "
              placeholder="Name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <label
              form="name"
              className="absolute left-0 pl-2 -top-7 text-white font-bold text-md transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-white peer-focus:text-md"
            >
              Email:
            </label>
          </div>

          <div className="relative border border-gray-400 rounded-lg bg-white bg-opacity-10 mt-10 flex">
            <div>
              <input
                id="name"
                name="name"
                type={password1.show ? "text" : "password"}
                className="w-full  text-white placeholder-transparent  bg-white bg-opacity-0  peer focus:outline-none "
                placeholder="Name"
                value={password1.value}
                onChange={(e) => {
                  setPassword1((prevState) => ({
                    ...prevState,
                    value: e.target.value,
                  }));
                }}
                autoComplete="off"
              />
              <label
                form="name"
                className="absolute left-0 pl-2 -top-7 text-white font-bold text-md transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-white peer-focus:text-md"
              >
                Password:
              </label>
            </div>
            <div
              className="self-center absolute right-3 cursor-pointer "
              onClick={() => {
                setPassword1((prevState) => ({
                  ...prevState,
                  show: !password1.show,
                }));
              }}
            >
              {password1.show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="relative border border-gray-400 rounded-lg bg-white bg-opacity-10 mt-10 flex">
            <div>
              <input
                id="name"
                name="name"
                type={password1.show ? "text" : "password"}
                className="w-full  text-white placeholder-transparent  bg-white bg-opacity-0  peer focus:outline-none "
                placeholder="Name"
                value={password2.value}
                onChange={(e) => {
                  setPassword2((prevState) => ({
                    ...prevState,
                    value: e.target.value,
                  }));
                }}
                autoComplete="off"
              />
              <label
                form="name"
                className="absolute left-0 pl-2 -top-7 text-white font-bold text-md transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-7 peer-focus:text-white peer-focus:text-md"
              >
                Confirm Password:
              </label>
            </div>
            <div
              className="self-center absolute right-3 cursor-pointer "
              onClick={() => {
                setPassword2((prevState) => ({
                  ...prevState,
                  show: !password2.show,
                }));
              }}
            >
              {password2.show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-gray-800 text-white active:bg-gray-900 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

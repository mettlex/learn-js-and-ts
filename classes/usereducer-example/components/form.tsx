"use client";

import { FormEvent, useReducer, useState } from "react";

// Step 1: Set the initial values

const initialState = {
  username: "",
  password: "",
};

export default function Form() {
  // Write the signature for useReducer
  const [state, dispatch] = useReducer(
    (prev: typeof initialState, newState: Partial<typeof initialState>) => ({
      ...prev,
      ...newState,
    }),
    initialState,
  );

  const { username, password } = state;

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // console.log(JSON.stringify(Array.from(formData.entries()), null, 2));

    // TODO: implement login

    // Suppose, we submitted the form successfully
    dispatch({
      username: "",
      password: "",
    });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={username}
                    onChange={(event) => {
                      dispatch({
                        username: event.target.value,
                      });
                    }}
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Your username"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={password}
                    onChange={(event) => {
                      dispatch({
                        password: event.target.value,
                      });
                    }}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Type your password"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <button
              className="p-2 hover:bg-slate-500 rounded bg-slate-600 text-white"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

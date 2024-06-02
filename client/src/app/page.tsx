'use client'

import React, { FormEvent } from "react";
import { useLogin } from "./hooks/useLogin";
import MoonLoader from "react-spinners/MoonLoader";


export default function Home() {
  const { isLoading, error, login } = useLogin();

  //handles login form submission
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await login(formData);
  }

  const styling = error ? "border-2 border-red-400" : "border-1";

  return (
    <form id = "main" onSubmit={ handleSubmit }>
      <h2 className="text-center text-6xl text-title-gray">TABS</h2>
      <h1 className="text-center mt-1 text-title-gray">Tembusu Abbey Booking System</h1>
        <div className="flex flex-col items-center gap-y-3 mt-8 w-full">
          {error && <h3 className="text-red-400 ">{error}</h3>}
          <input type="email" name="email" className={styling} placeholder="Email:" required/>
          <input type="password" name="password" className={styling} placeholder="Password:"  required/>
        </div>
      <button 
        className="bg-tembu-lightgreen rounded text-white mt-5 disabled:bg-gray-300" 
        type="submit" 
        disabled={isLoading}
      >
        Login
      </button>
      <MoonLoader loading={isLoading} />
    </form>
  );
}

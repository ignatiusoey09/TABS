'use client'

import React, { FormEvent } from "react";
import { useLogin } from "./hooks/useLogin";


export default function Home() {
  const { isLoading, error, login } = useLogin();

  //handles login form submission
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await login(formData);
  }

  return (
    <form id = "main" onSubmit={ handleSubmit }>
      <h2 className="text-center text-6xl text-title-gray">TABS</h2>
      <h1 className="text-center mt-1 text-title-gray">Tembusu Abbey Booking System</h1>
        <input type="email" name="email" className="mt-16" placeholder="Email:" required/>
        <input type="password" name="password" placeholder="Password:"  required/>
      <button className="bg-tembu-lightgreen rounded text-white mt-5" type="submit" disabled={isLoading}>
        Login
      </button>
      {error && <div>{error}</div>}
      {isLoading && <div>"loading..."</div>}
    </form>
  );
}

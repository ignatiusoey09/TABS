'use client'

import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function Home() {
  const router = useRouter();

  //handles login form submission
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: "POST",
        //headers: new Headers({'content-type':'multipart/form-data'}),
        body: formData,
      });

      const response_data = await response.json();
      
      if (response_data['login_success']) {
        router.push("/dashboard");
      } else {
        //popup or alert? what are ways to handle incorrect credentials?
        console.log("wrong credentials");
      }
    } catch {
      console.log("error handling form");
    }
  }

  return (
    <form id = "main" onSubmit={ handleSubmit }>
      <h2 className="text-center text-6xl text-title-gray">TABS</h2>
      <h1 className="text-center mt-1 text-title-gray">Tembusu Abbey Booking System</h1>
        <input type="email" name="email" className="mt-16" placeholder="Email:" required/>
        <input type="password" name="password" placeholder="Password:"  required/>
      <button className="bg-tembu-lightgreen rounded text-white mt-5" type="submit">
        Login
      </button>
    </form>
  );
}

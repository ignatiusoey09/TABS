'use client'

import React, { FormEvent } from "react";
import { useLogin } from "./hooks/useLogin";
import Image from "next/image";
import MoonLoader from "react-spinners/MoonLoader";


export default function Home() {
  const { isLoading, error, login } = useLogin();

  //handles login form submission
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await login(formData);
  }

  //styling input boxes when error occurs
  const styling = error ? "border-2 border-red-400" : "border-1";

  //styling for form element
  const form_style_lg = "lg:grow-0 lg:mt-[10%] lg:items-start lg:w-[600px]";
  const form_style = `grow flex flex-col mt-[60%] items-center ${form_style_lg}`;

  return (
    <div className="flex flex-row">
      <Image className="hidden lg:block mt-6 ml-4" src="/Tempo_Photo.png" alt="Teeny table photo" width={600} height={200}/>
      <form className="grow flex flex-col mt-[60%] items-center lg:mt-[10%] lg:items-start lg:mx-24" onSubmit={ handleSubmit }>
        <h2 className="text-center text-6xl text-title-gray">TABS</h2>
        <h1 className="text-center mt-1 text-title-gray">Tembusu Abbey Booking System</h1>
          <div className="flex flex-col items-center gap-y-3 mt-10 w-full lg:items-start">
            {error && <h3 className="text-red-400 ">{error}</h3>}
            <input type="email" name="email" className={styling} placeholder="Email:" required/>
            <input type="password" name="password" className={styling} placeholder="Password:"  required/>
          </div>
        <button
          className={`${isLoading ? 'hidden' : 'visible'} bg-tembu-lightgreen rounded text-white mt-10 w-[60%] lg:w-[70%]`}
          type="submit"
        >
          Login
        </button>
        <MoonLoader className="mt-8 lg:mx-32" loading={isLoading} />
      </form>
    </div>
  );
}

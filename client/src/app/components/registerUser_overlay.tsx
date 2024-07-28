import { useAuthContext } from "../hooks/useAuthContext";
import React, { FormEvent, useState } from "react";
import error from "next/error";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
    callback: () => void
}

export default function RegisterUserForm({ callback } : IProps) {
    const { state } = useAuthContext();

    //retrieve stored user in localstorage
    const retrieve = state.user;
    const token = retrieve?.token

    // styling
    const error_input_style = error ? "border-2 border-red-400" : "border-1";
    const input_style = "w-full mt-4 p-2.5 border rounded-lg focus:ring focus:ring-tembu-lightgreen focus:ring-opacity-50";
    const desc_input_style = input_style + " h-28";

    
    // variables to store input field data
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!name || !email || !password){
            toast.warn('Fill in ALL input fields', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            return
        }
        const user = {name, email, password}
        console.log(user)

        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backend_url}/api/user/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
            toast.error('Sorry! There was an issue with your registration 🥴', {  // popup notification
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        if(response.ok){
            setName('')
            setEmail('')
            setPassword('')
            console.log("new user registered", json)
            toast.success('User registered! 🥱', {  // popup notification
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
      }


    return (
            <div> 
            <form className="fixed w-full max-w-2xl top-[30%] left-[50%] bg-white z-30 space-y-6 border rounded-lg ring-4 ring-teal-600 px-5 py-5" onSubmit={ handleSubmit }>
                <h1 className="text-center align-text-top text-3xl font-semi m-1 text-title-green mb-6">Please fill in your particulars</h1>

                <input required type="text" name="name" className={input_style} placeholder="Name:" onChange={(e) => setName(e.target.value)} value={name}/>

                <input  required type="text" name="email" className={input_style} placeholder="Email:" onChange={(e) => setEmail(e.target.value)} value={email}/>

                <input required type="text" name="password" className={input_style} placeholder="Password:" onChange={(e) => setPassword(e.target.value)} value={password}/>

                <div className="flex flex-row">
                    <button className= "flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full mr-2 transition-colors" type="button" onClick={callback}>Cancel</button>
                    <button className= "flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full ml-2 transition-colors" type="submit">Submit</button>
                </div>
            </form>
            <div className="fixed w-screen h-screen z-20 bg-gray-400/75" onClick={callback}></div>
            </div>
    );
}
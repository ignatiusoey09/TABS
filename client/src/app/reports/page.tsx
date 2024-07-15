'use client'

import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { FormEvent, useState } from "react";
import error from "next/error";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReportContext } from '../hooks/useReportContext';




export default function Reports() {
    const router = useRouter();
    const { logout } = useLogout();
    const { state } = useAuthContext();

    //retrieve stored user in localstorage
    const retrieve = state.user;
    const token = retrieve?.token ? retrieve.token : ''

    var user;
    if (retrieve) {
        user = retrieve.user;
    } else {
        user = {email:"", name: "", role:"",};
    }

    const handleClick = () => {
        logout();
        //send back to login page
        router.push("/");
    }

    // styling
    const error_input_style = error ? "border-2 border-red-400" : "border-1";

    const input_style = "w-full mt-4 p-2.5 border rounded-lg focus:ring focus:ring-tembu-lightgreen focus:ring-opacity-50";
    const desc_input_style = input_style + " h-28";

    
    // variables to store input field data
    const [name, setName] = useState('')
    const [item, setItem] = useState('')
    const [description, setDesc] = useState('')
    
    const { dispatch } = useReportContext()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!name || !item || !description){
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
        const report = {name, item, description}
        console.log(report)

        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backend_url}/api/report/submitReport`, {
            method: 'POST',
            body: JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            console.log(json.error)
            toast.error('Sorry! There was an issue with your submission 🥴', {  // popup notification
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
            setItem('')
            setDesc('')
            console.log("new report added", json)

            dispatch({type:'UPLOAD_REPORT', payload: json})
            toast.success('Report submitted! 🥱', {  // popup notification
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
        <Layout>
            <div className="flex flex-col items-center px-4 py-8">
            <h1 className="text-center align-text-top text-3xl font-semi m-1 text-title-gray mb-6">Submit a new report</h1>
            <form className="w-full max-w-md space-y-6" onSubmit={ handleSubmit }>
                
                <input type="text" name="name" className={input_style} placeholder="Name:" onChange={(e) => setName(e.target.value)} value={name}/>

                <input type="text" name="itemDamaged" className={input_style} placeholder="Item:" onChange={(e) => setItem(e.target.value)} value={item}/>

                <input type="text" name="description" className={desc_input_style} placeholder="Description:" onChange={(e) => setDesc(e.target.value)} value={description}/>

                <button className="flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full transition-colors" type="submit">Submit</button>
              
            </form>
            <ToastContainer />
            </div>
        </Layout>
    );
}
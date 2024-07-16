'use client'

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useLogout } from "@/app/hooks/useLogout";
import Layout from "@/app/components/layout";
import error from "next/error";
import { useAnnouncementContext } from "../hooks/useAnnouncementContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function AnnouncementForm () {

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
        user = {email:"", name: "", role:""};
    }

    const handleClick = () => {
        logout();
        //send back to login page
        router.push("/");
    }

    const name = user.name
    const role = user.role




    const { dispatch } = useAnnouncementContext()
    // variables to store input field data
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')

    // styling
    const error_input_style = error ? "border-2 border-red-400" : "border-1";
    const input_style = "w-full mt-4 p-2.5 border rounded-lg focus:ring focus:ring-tembu-lightgreen focus:ring-opacity-50";
    const desc_input_style = input_style + " h-28";

    
    // handling submission
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!title || !message){
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
        const  announcement = {name, role, title, message}
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
       
        const response = await fetch(`${backend_url}/api/announcement/createAnnouncement`, {
            method: 'POST',
            body: JSON.stringify(announcement),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        const json = await response.json()
        if(!response.ok){
            console.log(json.error)
            toast.error('Sorry! There was an issue while uploading 😭', {  // popup notification
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
            setTitle('')
            setMessage('')
            console.log('New annoucnement uploaded', json)
            dispatch({type: 'UPLOAD_ANNOUNCEMENT', payload: json})
            router.replace('/announcements')
        }
    }

    const reRoute = () => {
        router.replace('/profile')
    }



    
        return (
            <Layout>
                <div className="flex flex-col items-center px-4 py-5">
                    <form className="w-full max-w-md space-y-6 border rounded-lg ring-4 ring-teal-600 px-5 py-5" onSubmit={ handleSubmit }>
                        <h1 className="text-center align-text-top text-3xl font-semi m-1 text-title-green mb-6">Create new Announcement</h1>

                        <input type="text" name="title" className={input_style} placeholder="Title:" onChange={(e) => setTitle(e.target.value)} value={title}/>

                        <input type="text" name="message" className={desc_input_style} placeholder="Message:" onChange={(e) => setMessage(e.target.value)} value={message}/>

                        <div className="flex flex-row">
                            <button className= "flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full mr-2 transition-colors" type="button" onClick={reRoute}>Cancel</button>
                            <button className= "flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full ml-2 transition-colors" type="submit">Submit</button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </Layout>
        )
}
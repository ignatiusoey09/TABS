'use client'

import { useRouter, useSearchParams } from "next/navigation"
import Layout from "../components/layout";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAnnouncementContext } from "../hooks/useAnnouncementContext";
import React, { FormEvent, useState, useEffect } from "react";
import error from "next/error";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateAnnouncement = () => {
    const router = useRouter();
    const { logout } = useLogout();
    const { state } = useAuthContext();
    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

    //retrieve stored user in localstorage
    const retrieve = state.user;

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
 
    const form_style_lg = "lg:ml-14 lg:px-0 lg:mt-[8%] lg:items-start";
    const form_style_md = "md:mt-[45%] md:px-28";
    const form_style = "w-full max-w-md space-y-6"
    //

    // original content

    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const params = useSearchParams()
    const id = params.get('id')
    const token = retrieve?.token ? retrieve.token : ''

    useEffect(() => {
        const fetchAnnouncement = async () => {
            
            // get the announcement details
            const response = await fetch(`${backend_url}/api/announcement/getSingleAnnouncement/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const prevAnnouncement = await response.json()
            if(!response.ok){
                toast.success('Announcement updated 🥳', {  // popup notification
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    setTimeout(() => router.replace('/announcements'), 1500)

            }
            if(response.ok){
               setTitle(prevAnnouncement.title)
               setMessage(prevAnnouncement.message)
            }
        }
        fetchAnnouncement()
    }, [])


    const { stateAnn, dispatch } = useAnnouncementContext()
    const name = user.name
    const role = user.role
    

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const announcement = {title, message}
        
        const response = await fetch(`${backend_url}/api/announcement/updateAnnouncement/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(announcement),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const json = await response.json()
        if(!response.ok){
            console.log(json.error)
            toast.error('Sorry! There was an issue while updating 😭', {  // popup notification
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setTimeout(() => router.replace('/announcements'), 1500)
        }
        if(response.ok){
            setTitle('')
            setMessage('')
            console.log('Announcement updated', json)
            dispatch({type: 'UPDATE_ANNOUNCEMENT', payload: json})
            toast.success('Announcement updated 🥳', {  // popup notification
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setTimeout(() => router.replace('/announcements'), 1500)
        }
    }


    return (
        <Layout>
        <div className="flex flex-col items-center px-4 py-8">
        <form className={form_style} onSubmit={ handleSubmit }>
            <h1 className="text-center align-text-top text-3xl font-semi m-1 text-title-green mb-6">Update Announcement</h1>
            <input type="text" name="title" className={input_style} onChange={(e) => setTitle(e.target.value)} value={title} required/>

            <input type="text" name="message" className={desc_input_style} onChange={(e) => setMessage(e.target.value)} value={message} required/>

            <button className= "flex justify-center items-center bg-tembu-green hover:bg-tembu-lightgreen text-white rounded cursor-pointer w-full transition-colors">Submit</button>
            <ToastContainer />
        </form>
        </div>
        </Layout>
        
    )
}

export default UpdateAnnouncement
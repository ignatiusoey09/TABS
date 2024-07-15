'use client'

import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { FormEvent, useState, useEffect } from "react";
import error from "next/error";
import { useAnnouncementContext } from "../../hooks/useAnnouncementContext";
import AnnouncementForm from "../../components/announcementComponents/announcementForm"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import announcement details component
import AnnouncementDetails from "../../components/announcementComponents/quartermasterAnnDetails";


export default function Announcements() {
    const router = useRouter();
    const { logout } = useLogout();
    const { state } = useAuthContext();

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

    // display latest list of annnouncemnts
    const { stateAnn, dispatch } = useAnnouncementContext()

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
            
            const response = await toast.promise(  // using toast.promise to show loading bar
                fetch(`${backend_url}/api/announcement/getAnnouncements`, {
                headers: {
                    'Authorization': `Bearer ${state.user?.token}`
                }
            }), 
                {
                    pending: 'Fetching all announcements 📥',
                    success: 'All announcements fetched 🥳',
                    error: 'Sorry something wrong has occured 😭'
                }
            )
            const json = await response.json()
            

            if(response.ok){
                dispatch({type: 'SHOW_ANNOUNCEMENTS', payload:json})
            }
        }
        fetchAnnouncements()
    }, [dispatch])
    
    // form element props
    const name = user.name
    const role = user.role




    return (
            <Layout>
            <div>
                <h2 className="text-center align-text-top text-3xl m-1 text-title-gray">Announcements</h2>

                <div>
                {stateAnn && stateAnn.announcements && stateAnn.announcements.map(announcement => (
                    <AnnouncementDetails key={announcement._id} announcement={announcement} token={state.user?.token} />
                ))}
                </div>
                <ToastContainer />
                <AnnouncementForm name={name} role={role} token={state.user?.token}/>
            </div>
            </Layout>
    );
}
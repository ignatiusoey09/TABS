'use client'

import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { useEffect } from "react";
import { useAnnouncementContext } from "../../hooks/useAnnouncementContext";
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
    
    return (
            <Layout>
            <div className="ml-2 mt-8 lg:ml-8">
                <h2 className="align-text-top text-3xl text-title-gray">Announcements</h2>

                <div className="flex flex-col mt-12 pr-1 overflow-y-auto w-[95%%] h-[600px] divide-y-2 lg:w-[85%] lg:h-96">
                    {stateAnn.announcements.length == 0 && (
                    <div className="bg-gray-100 p-6 rounded-lg mb-4 mx-1 borderbg-gray-100 transition duration-300 ease-in-out hover:bg-gray-200">
                        <h1 className="text-center text-xl text-gray-600 font-semibold p-6">No announcements 🥳</h1>
                    </div>
                    )}
                    {stateAnn && stateAnn.announcements && stateAnn.announcements.map(announcement => (
                        <AnnouncementDetails key={announcement._id} announcement={announcement} token={retrieve?.token}/>
                    ))}
                </div>
                <ToastContainer />
            </div>
            </Layout>
    );
}
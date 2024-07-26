'use client'

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useLogout } from "@/app/hooks/useLogout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Layout from "@/app/components/layout";
import ReportDetails from "@/app/components/reportDetails";
import AnnouncementForm from "@/app/components/announcementComponents/announcementForm_overlay";
import RegisterUserForm from "@/app/components/registerUser_overlay";
import ManageAccountOptions from "@/app/components/manageAccounts_overlay";

interface Report {
    _id?: string,
    name: string,
    item: string,
    description: string,
    createdAt?: string
    updatedAt?: string
}

export default function Profile () {
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

    // routes to view reports page
    const handleReport = () => {
        router.replace('/viewReports')
    }

    // handle toggling announcement form model
    const [announcementModal, setModal] = useState(false)
    const handleAnnouncementModalClose = () => {
        setModal(false);
    }
    
    const newAnnouncement = () => {
        setModal(true)
    }

    // handle toggling manage accounts options
    const [showOptions, setShowOptions] = useState(false)
    const handleShowOptionsClose = () => {
        setShowOptions(false)
    }

    // retrieve data to export as xlsx file
    const [data, setData] = useState([])
    const manageAccount = async () => {
        setShowOptions(true)
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backend_url}/api/user/getusers`, {
            headers: {
                'Authorization': `Bearer ${state.user?.token}`
            }
        })
        let json = await response.json()
        json = json.map((u: any) => ({"name": u.name, "email": u.email, "role": u.role}))
        setData(json)
    }

    // handle toggling register user form model
    const [registerModal, setRegisterModal] = useState(false)
    const handleRegisterModalClose = () => {
        setRegisterModal(false);
    }

    const newAccount = () => {
        setRegisterModal(true)
    }
    
    // intended Manage Inventory feature. Can just leave here and focus on other core features first
    /*const manageInventory = () => {

    }
    // <button onClick={manageInventory} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">Manage Inventory</button>
    */


    // handle opening and closing abbey timeslots
    const manageAbbey = () => {

    }

    return (
        <Layout>
            <div className="flex flex-col w-full grow">
                {announcementModal && <AnnouncementForm callback={handleAnnouncementModalClose} />}
                {registerModal && <RegisterUserForm callback={handleRegisterModalClose}/>}
                {showOptions && <ManageAccountOptions callback={handleShowOptionsClose} createAcc={newAccount} data={data} />}
                <h1 className="text-4xl pl-7 pt-7 mt-0 text-title-gray">QUARTERMASTER PAGE</h1>
                <h2 className="text-3xl pl-8 pt-3">
                    {user.email}
                </h2>
                <h2 className="text-gray-600 pl-7 pt-4">
                    {user.role}
                </h2>
                <h2 className="text-gray-600 pl-7 py-1">
                    {user.name}
                </h2>

                <div className="flex-grow py-11 pl-6">
                    <div>
                        <button onClick={handleReport} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">View Reports</button>
                        <button onClick={newAnnouncement} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">New Announcement</button>
                        <button onClick={manageAccount} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">Manage Accounts</button>
                        <button onClick={manageAbbey} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">Manage Abbey Slots</button>
                    </div>
                </div>


                <button
                    className="mt-auto self-center text-xl text-red-600 pt-2"
                    onClick={handleClick}>
                        Logout
                </button>  
                <ToastContainer />
            </div>
        </Layout>
    );
}
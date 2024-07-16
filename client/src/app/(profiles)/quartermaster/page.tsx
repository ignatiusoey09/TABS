'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useLogout } from "@/app/hooks/useLogout";
import Layout from "@/app/components/layout";
import ReportDetails from "@/app/components/reportDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiSquareCheck } from "react-icons/ci";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useReportContext } from '../../hooks/useReportContext';


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

    const handleReport = () => {
        router.replace('/viewReports')
    }

    const newAnnouncement = () => {
        router.replace('/announcementForm')
    }

    const newAccount = () => {

    }

    const manageInventory = () => {

    }

    const manageAbbey = () => {

    }

    return (
        <Layout>
            <div className="flex flex-col w-screen grow p-6">
                <h1 className="text-4xl p-1 mt-0 text-title-gray">QUARTERMASTER PAGE</h1>
                <h2 className="text-3xl p-2">
                    {user.email}
                </h2>
                <h2 className="text-gray-600 p-1">
                    {user.role}
                </h2>
                <h2 className="text-gray-600 p-1">
                    {user.name}
                </h2>

                <div className="flex-grow py-10">
                    <div>
                        <button onClick={handleReport} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">View Reports</button>
                        <button onClick={newAnnouncement} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">New Announcement</button>
                        <button onClick={newAccount} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">Register Account</button>
                        <button onClick={manageInventory} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">Manage Inventory</button>
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
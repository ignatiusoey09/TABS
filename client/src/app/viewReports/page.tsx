'use client'

import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { FormEvent, useState, useEffect } from "react";
import error from "next/error";
import { useReportContext } from "../hooks/useReportContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import announcement details component
import ReportDetails from "../components/reportDetails";


export default function viewReports() {
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
    const { stateAnn, dispatch } = useReportContext()
    const token = retrieve?.token ? retrieve?.token : ''

    useEffect(() => {
        const fetchReports = async () => {
            const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

            const response = await toast.promise(  // using toast.promise to show loading bar
                fetch(`${backend_url}/api/report/getReports`, {
                headers: {
                    'Authorization': `Bearer ${state.user?.token}`
                }
            }), 
                {
                    pending: 'Fetching all reports 📥',
                    success: 'All reports fetched 🥳',
                    error: 'Sorry something wrong has occured 😭'
                }
            )
            const json = await response.json()
            

            if (response.ok){
                dispatch({type: 'SHOW_REPORTS', payload: json})
            }
        }
        fetchReports()
        }, [dispatch])
    




    return (
            <Layout>
            <div>
                <h2 className="text-center mb-5 align-text-top text-3xl m-1 text-title-gray">Reports</h2>

                <div>
                    {stateAnn.reports.length == 0 && (
                        <div className="bg-gray-100 p-6 rounded-lg mb-4 mx-1 transition duration-300 ease-in-out hover:bg-gray-200 ring-2 ring-teal-500">
                            <h1 className="text-center text-xl text-gray-600 font-semibold p-6">No reports 🥳</h1>
                        </div>
                    )}
                        
                    {stateAnn && stateAnn.reports && stateAnn.reports.map(report => (
                        <ReportDetails key={report._id} report={report} token={token} />
                    ))}
                </div>

                    
                <ToastContainer />
            </div>
            </Layout>
    );
}
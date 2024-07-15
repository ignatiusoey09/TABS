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

    const { stateAnn, dispatch } = useReportContext()


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
    

    const peek = "invisible"
    const aboo = "visible"
    const [showReports, setShowReports] = useState(peek)
    const handleReport = () => {
        if(showReports == peek){
            setShowReports(aboo)
        }
        else{
            setShowReports(peek)
        }
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
                    <div className="bg-purple-100 p-6 rounded-lg mb-4">
                        <button onClick={handleReport}>Current Reports</button>
                    </div>
                </div>

                
                <div className={showReports}>
                    <div className="border rounded-lg ring-4 px-2 py-2">
                        {stateAnn && stateAnn.reports && stateAnn.reports.map(report => (
                            <ReportDetails key={report._id} report={report} token={token} />
                        ))}
                    </div>
                </div>
                

                <button
                    className="mt-auto self-center text-xl text-red-600"
                    onClick={handleClick}>
                        Logout
                </button>  

                <ToastContainer />
            </div>
        </Layout>
    );
}
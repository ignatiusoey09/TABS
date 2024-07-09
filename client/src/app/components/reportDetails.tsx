import React, { EventHandler } from 'react'; // Import React
import Link from 'next/link';
import { IoIosCheckbox } from "react-icons/io";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReportContext } from '../hooks/useReportContext';

interface Report {
    _id?: string,
    name: string,
    item: string,
    description: string,
    createdAt?: string
    updatedAt?: string
}


interface ReportDetailsProps {
    report: Report,
    token: string | undefined
}


const ReportDetails: React.FC<ReportDetailsProps> = ({ report, token }) => {

    const { dispatch } = useReportContext()


    const handleResolve = async () => {
        confirmAlert({
            title: 'Confirm?',
            message: 'Are you sure you want to resolve this report',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
                        const response = await fetch(`${backend_url}/api/report/resolveReport/${report._id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        const json = await response.json()

                        if (!response.ok){
                            toast.warning('Error resolving Report 🤓', {  // popup notification
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                            console.log(json.error)
                        }

                        if(response.ok){
                            dispatch({type:'RESOLVE_REPORT', payload: json})
                            toast.success('Report resolved 😎', {  // popup notification
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                            console.log(json)
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => ({})
                }
            ]
        })
    }


    const id = report._id ? report._id : ''
    const date = report.createdAt ? report.createdAt : ''




    return (
        <div className="bg-purple-100 p-6 rounded-lg mb-4 relative flex items-start">
            <img alt="profile" className="w-16 h-16 rounded-full shadow-md mr-4" />
            <div className="flex-grow flex flex-col justify-between">
            <div>
                <h4 className="text-lg font-semibold">{report.item}</h4>
                <p className="text-gray-600">{report.description}</p>
            </div>
            <div className="flex justify-between items-center w-full mt-2">
                <p className="text-xs text-gray-500">{report.name}</p>
            </div>
            </div>
            <p className="text-xs text-gray-500 absolute left-4 bottom-4">
                {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                })}
            </p>
            <div className="flex absolute right-4 bottom-4 space-x-2">
            <span onClick={handleResolve} className="cursor-pointer">
                <IoIosCheckbox color="#00563B" size="20px" />
             </span>
            </div>
        </div>
    )

}

export default ReportDetails
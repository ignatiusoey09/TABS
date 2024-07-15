import { useAnnouncementContext } from "../../hooks/useAnnouncementContext";
import React from 'react'; // Import React
import Link from 'next/link';
import { FaRegTrashAlt,FaUserCircle,FaRegEdit } from "react-icons/fa";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Announcement {
    _id?: string,
    name: string,
    role: string,
    title: string,
    message: string,
    createdAt?: string
    updatedAt?: string
}

interface AnnouncementDetailsProps {
    announcement: Announcement,
    token: string | undefined
}


const AnnouncementDetails: React.FC<AnnouncementDetailsProps> = ({ announcement, token }) => {


    const { dispatch } = useAnnouncementContext()

    const handleDelete = async () => {
        confirmAlert({
            title: 'Confirm?',
            message: 'Are you sure you want to delete',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL
                        const response = await fetch(`${backend_url}/api/announcement/deleteAnnouncement/${announcement._id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        const json = await response.json()

                        if (!response.ok){
                            toast.warning('Error deleting Announcement 💀', {  // popup notification
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
                            dispatch({type:'DELETE_ANNOUNCEMENT', payload: json})
                            toast.success('Announcement deleted 😨', {  // popup notification
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


    // link param and date variable
    const id = announcement._id ? announcement._id : ''
    const date = announcement.createdAt ? announcement.createdAt : ''




    return (
        <div className="bg-purple-100 p-6 rounded-lg mb-4 relative flex items-start">
            <img alt="profile" className="w-16 h-16 rounded-full shadow-md mr-4" />
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h4 className="text-lg font-semibold">{announcement.title}</h4>
                    <p className="text-gray-600">{announcement.message}</p>
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                    <p className="text-xs text-gray-500">{announcement.name} - {announcement.role}</p>
                </div>
            </div>
            <p className="text-xs text-gray-500 absolute left-4 bottom-4">
                {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                })}
            </p>
            <div className="flex absolute right-4 bottom-4 space-x-2">
            <Link href={`/updateAnnouncement?id=${encodeURIComponent(id)}`}>
                <FaRegEdit color="#9f7aea" size="22px" />
            </Link>
            <span onClick={handleDelete} className="cursor-pointer">
                <FaRegTrashAlt color="#e3342f" size="22px" />
             </span>
            </div>
        </div>
    )
}

export default AnnouncementDetails
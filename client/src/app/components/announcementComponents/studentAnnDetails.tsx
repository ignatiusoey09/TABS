import React from 'react'; // Import React
import Link from 'next/link';
import { useAuthContext } from "../../hooks/useAuthContext";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

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
    announcement: Announcement
}


const AnnouncementDetails: React.FC<AnnouncementDetailsProps> = ({ announcement }) => {

    const id = announcement._id ? announcement._id : ''
    const date = announcement.createdAt ? announcement.createdAt : ''

    return (
        <div className="bg-gray-100 p-6 rounded-lg mb-4 mx-1 relative flex items-start transition duration-300 ease-in-out hover:bg-gray-200 ring-2 ring-teal-500">
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
        </div>
    )

}

export default AnnouncementDetails
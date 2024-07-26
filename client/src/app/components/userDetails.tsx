import React, { EventHandler } from 'react'; // Import React
import Link from 'next/link';
import { IoIosCheckbox } from "react-icons/io";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../hooks/useUserContext';

interface User {
    _id?: string,
    email: string,
    name: string,
    password: string,
    role: string
}


interface UserDetailsProps {
    user: User,
    token: string | undefined
}


const UserDetails: React.FC<UserDetailsProps> = ({ user, token }) => {

    const { dispatch } = useUserContext()


    const handleResolve = async () => {
        /*confirmAlert({
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
        })*/
    }




    return (
        <div className="bg-gray-100 p-6 rounded-lg mb-4 mx-1 relative flex items-start transition duration-300 ease-in-out hover:bg-gray-200 ring-2 ring-teal-500">
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h4 className="text-lg font-semibold">Name: {user.name}</h4>
                    <p className="text-gray-600">Email: {user.email}</p>
                    <p className="text-gray-600">Role: {user.role}</p>
                </div>
                
                
                <div className="flex absolute right-4 bottom-4">
                    <span onClick={handleResolve} className="cursor-pointer">
                        <IoIosCheckbox color="#00563B" size="20px" />
                    </span> 
                </div>
            </div>
        </div>
    )

}

export default UserDetails
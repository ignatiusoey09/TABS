'use client'

import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import React, { FormEvent, useState, useEffect } from "react";
import error from "next/error";
import { useUserContext } from "../hooks/useUserContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import announcement details component
import UserDetails from "../components/userDetails";


export default function ViewUsers() {
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
    const { stateAnn, dispatch } = useUserContext()
    const token = retrieve?.token ? retrieve?.token : ''

    useEffect(() => {
        const fetchUsers = async () => {
            const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

            const response = await toast.promise(  // using toast.promise to show loading bar
                fetch(`${backend_url}/api/user/getUsers`, {
                headers: {
                    'Authorization': `Bearer ${state.user?.token}`
                }
            }), 
                {
                    pending: 'Fetching all users 📥',
                    success: 'All users fetched 🥳',
                    error: 'Sorry something wrong has occured 😭'
                }
            )
            const json = await response.json()
            

            if (response.ok){
                dispatch({type: 'SHOW_USERS', payload: json})
            }
        }
        fetchUsers()
        }, [dispatch])
    



    return (
            <Layout>
            <div>
                <h2 className="text-center my-5 align-text-top text-3xl m-1 text-title-gray">Users</h2>

                <div>
                    {stateAnn.users.length == 0 && (
                        <div className="bg-gray-100 p-6 rounded-lg mb-4 mx-1 transition duration-300 ease-in-out hover:bg-gray-200 ring-2 ring-teal-500">
                            <h1 className="text-center text-xl text-gray-600 font-semibold p-6">No abbey 🥳</h1>
                        </div>
                    )}
                        
                    {stateAnn && stateAnn.users && stateAnn.users.map(user => (
                        <UserDetails key={user._id} user={user} token={token} />
                    ))}
                </div>

                    
                <ToastContainer />
            </div>
            </Layout>
    );
}
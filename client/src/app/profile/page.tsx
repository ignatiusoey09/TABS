'use client'

import { useRouter } from "next/navigation";
import Layout from "../components/layout";
import { useLogout } from "../hooks/useLogout";


export default function Profile() {
    const router = useRouter();
    const { logout } = useLogout();

    //retrieve stored user in localstorage
    const retrieve = localStorage.getItem('user');
    var user;

    if(!retrieve) {
        user = {email: "", role: ""};
    } else {
        user = JSON.parse(retrieve).user;
    }

    const handleClick = () => {
        logout();
        //send back to login page
        router.push("/");
    }

    return (
        <Layout>
            <div className="flex flex-col w-screen grow items-center">
                <h2 className="mt-12">
                    {user.email}
                </h2>
                <h2>
                    {user.role}
                </h2>
                <button
                    className="bg-red-200 rounded-lg mt-12"
                    onClick={handleClick}>
                        Logout
                </button>        
            </div>
        </Layout>
    );
}
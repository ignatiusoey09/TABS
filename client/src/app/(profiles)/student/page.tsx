'use client'

import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";


export default function Profile() {
    const router = useRouter();
    const { logout } = useLogout();
    const { state } = useAuthContext();

    //retrieve stored user in localstorage
    const retrieve = state.user;

    var user;
    if (retrieve) {
        user = retrieve.user;
    } else {
        user = {email:"", role:""};
    }

    const handleClick = () => {
        logout();
        //send back to login page
        router.push("/");
    }

    return (
        <Layout>
            <div className="flex flex-col w-screen grow items-center">
                <h1>STUDENT PAGE</h1>
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
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
        user = {email:"", name: "", role:"",};
    }

    const handleClick = () => {
        logout();
        //send back to login page
        router.push("/");
    }

    /**
     * TODO: implement "my bookings" listings feature  
     */

    return (
        <Layout>
            <div className="flex flex-col w-screen grow p-6">
                <div>
                    <h2 className="text-3xl">
                        {user.name}
                    </h2>
                    <h2 className="text-gray-600">
                        {user.email}
                    </h2>
                </div>
                
                <button
                    className="mt-auto self-center text-xl text-red-600"
                    onClick={handleClick}>
                        Logout
                </button>        
            </div>
        </Layout>
    );
}
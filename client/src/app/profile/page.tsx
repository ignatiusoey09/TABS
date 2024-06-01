'use client'

import Layout from "../components/layout";
import { useLogout } from "../hooks/useLogout";
import { useRouter } from "next/navigation";


export default function Profile() {
    const { logout } = useLogout();
    const router = useRouter();

    const handleClick = () => {
        logout();
        router.push("/");
    }

    return (
        <Layout>
            <button 
                className="place-self-center justify bg-red-200 rounded-lg" 
                onClick={handleClick}>
                    Logout
            </button>
        </Layout>
    );
}
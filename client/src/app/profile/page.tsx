'use client'

import Layout from "../components/layout";
import { useLogout } from "../hooks/useLogout";
import { useRouter } from "next/navigation";


export default function Profile() {
    const { logout } = useLogout();
    const router = useRouter();

    const user = JSON.parse(localStorage.getItem('user') || '{}').user;

    const handleClick = () => {
        logout();
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
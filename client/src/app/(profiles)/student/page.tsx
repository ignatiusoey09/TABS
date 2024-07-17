'use client'

import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGetBookingsByUserId } from "@/app/hooks/useGetBookingsByUserID";
import { useEffect } from "react";
import { useState } from "react";
import UpcomingBooking from "../../components/upcoming_booking";
import { MoonLoader } from "react-spinners";

interface IUser {
    id: string,
        email: string,
        name: string,
        role: string,
};

interface IState {
    date: string,
    time: string,
    id: string,
}


export default function Profile() {
    const router = useRouter();
    const { logout } = useLogout();
    const { state } = useAuthContext();
    const { getBookings, isLoading } = useGetBookingsByUserId();
    const [ userBookings, setUserBookings ] = useState<IState[]>([]);

    //retrieve stored user in localstorage
    const retrieve = state.user;

    var user:IUser;
    if (retrieve) {
        user = retrieve.user;
    } else {
        user = {id:"", email:"", name: "", role:"",};
    }


    useEffect(() => {
        const fetchData = async () => {
            const myBookings = await getBookings(user.id);
            setUserBookings(myBookings);
        }
        fetchData();
    }, []);

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
            <div className="flex flex-col w-full h-screen p-6 pl-14">
                <div>
                    <h2 className="text-3xl">
                        {user.name}
                    </h2>
                    <h2 className="text-gray-600">
                        {user.email}
                    </h2>
                </div>
                    
                <div className="mt-20 w-[70%] h-full">
                    <h1>My Bookings</h1>
                    <MoonLoader className="mx-auto mt-20" loading={isLoading}/>
                    {!isLoading && <div className="flex flex-col space-y-4 overflow-y-auto h-64">
                        {userBookings.map(x => (
                            <UpcomingBooking date={x.date} time={x.time} booking_id={x.id} />
                        ))}
                    </div>}
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
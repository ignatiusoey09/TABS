'use client'

import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useBookingLoadingContext } from "@/app/hooks/useBookingLoadingContext";
import { useGetBookingsByUserId } from "@/app/hooks/useGetBookingsByUserID";
import { useEffect } from "react";
import { useState } from "react";
import UpcomingBooking from "../../components/profileComponents/upcoming_booking";
import { MoonLoader } from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

interface IUser {
    id: string,
        email: string,
        name: string,
        role: string,
};

export interface IState {
    date: string,
    time: string,
    id: string,
}


export default function Profile() {
    const router = useRouter();
    const { logout } = useLogout();
    const { state } = useAuthContext();
    const { isLoading, setIsLoading } = useBookingLoadingContext();
    const { getBookings } = useGetBookingsByUserId({setIsLoading});
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
            <div className="flex flex-col max-w-screen h-full p-2 mt-2 ml-2 lg:mt-6 lg:ml-14">
                <div>
                    <h2 className="text-3xl">
                        {user.name}
                    </h2>
                    <h2 className="text-gray-600">
                        {user.email}
                    </h2>
                </div>
                    
                <div className="mt-20 w-[95%] h-full lg:w-[70%]">
                    <h1>My Bookings</h1>
                    <MoonLoader className="mx-auto mt-20" loading={isLoading}/>
                    {!isLoading && <div className="flex flex-col space-y-4 overflow-y-auto h-64 z-0">
                        {userBookings.map(x => (
                            <UpcomingBooking setState={setUserBookings} date={x.date} time={x.time} booking_id={x.id} user_id={user.id}/>
                        ))}
                    </div>}
                </div>
                
                <button
                    className="mt-auto self-center text-xl text-red-600"
                    onClick={handleClick}>
                        Logout
                </button>
                <ToastContainer />        
            </div>
        </Layout>
    );
}
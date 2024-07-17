'use client'

import { useRouter } from "next/navigation";
import Layout from "../../components/layout";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGetBookingsByUserId } from "@/app/hooks/useGetBookingsByUserID";
import { useEffect } from "react";
import { useState } from "react";
import UpcomingBooking from "../../components/upcoming_booking";

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
            //myBookings is a json of arrays
            //converting myBookings into an array of timeslots
            const dates = Object.keys(myBookings);
            var arr = [];
            for (var d of dates) {
                var bookings_by_date = myBookings[d]; //timeslots on date d
                let obj;
                for (let i = 0; i < bookings_by_date.length; i++) {
                    obj = {date: d, time: bookings_by_date[i].time, id: bookings_by_date[i].id};
                    arr.push(obj);
                }
            }
            setUserBookings(arr);
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
                    
                <div className="m-auto mt-20 w-full h-full">
                    <h1>My Bookings</h1>
                    <div className="flex flex-col w-[70%] space-y-4 overflow-y-auto h-64">
                        {userBookings.map(x => (
                            <UpcomingBooking date={x.date} time={x.time} booking_id={x.id} />
                        ))}
                    </div>
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
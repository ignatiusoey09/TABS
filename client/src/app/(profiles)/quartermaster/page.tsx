'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { useLogout } from "@/app/hooks/useLogout";
import { ToastContainer } from 'react-toastify';
import UpcomingBooking  from "@/app/components/profileComponents/upcoming_booking";
import { useGetBookingsByUserId } from "@/app/hooks/useGetBookingsByUserID";
import { useBookingLoadingContext } from "@/app/hooks/useBookingLoadingContext";
import 'react-toastify/dist/ReactToastify.css';
import Layout from "@/app/components/layout";
import AnnouncementForm from "@/app/components/announcementComponents/announcementForm_overlay";
import RegisterUserForm from "@/app/components/registerUser_overlay";
import ManageAccountOptions from "@/app/components/manageAccounts_overlay";
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

export default function Profile () {
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

    const handleLogout = () => {
        logout();
        //send back to login page
        router.push("/");
    }

    // routes to view reports page
    const handleReport = () => {
        router.replace('/viewReports')
    }

    // handle toggling announcement form model
    const [announcementModal, setModal] = useState(false)
    const handleAnnouncementModalClose = () => {
        setModal(false);
    }
    
    const newAnnouncement = () => {
        setModal(true)
    }

    // handle toggling manage accounts options
    const [showOptions, setShowOptions] = useState(false)
    const handleShowOptionsClose = () => {
        setShowOptions(false)
    }

    // retrieve data to export as xlsx file
    const [data, setData] = useState([])
    const manageAccount = async () => {
        setShowOptions(true)
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backend_url}/api/user/getusers`, {
            headers: {
                'Authorization': `Bearer ${retrieve?.token}`
            }
        })
        let json = await response.json()
        json = json.map((u: any) => ({"name": u.name, "email": u.email, "role": u.role}))
        setData(json)
    }

    // handle toggling register user form model
    const [registerModal, setRegisterModal] = useState(false)
    const handleRegisterModalClose = () => {
        setRegisterModal(false);
    }

    const newAccount = () => {
        setRegisterModal(true)
    }
    
    // intended Manage Inventory feature. Can just leave here and focus on other core features first
    /*const manageInventory = () => {

    }
    // <button onClick={manageInventory} className="bg-gray-100 p-6 rounded-lg mb-4 w-full text-left flex items-center">Manage Inventory</button>
    */


    // handle opening and closing abbey timeslots
    const manageAbbey = () => {}

    const TOOL_BUTTON_STYLE = "bg-gray-100 p-1 rounded-lg text-xs text-center lg:p-2"

    return (
        <Layout>
            <div className="flex flex-col w-full h-full">
                {announcementModal && <AnnouncementForm callback={handleAnnouncementModalClose} />}
                {registerModal && <RegisterUserForm callback={handleRegisterModalClose}/>}
                {showOptions && <ManageAccountOptions callback={handleShowOptionsClose} createAcc={newAccount} data={data} />}
                <div className="ml-2 mt-5 lg:ml-10">
                    <h1 className="text-4xl text-title-gray">QUARTERMASTER</h1>
                    <h2 className="text-3xl mt-1">
                        {user.email}
                    </h2>
                    <h2 className="text-gray-600 mt-1">
                        {user.name}
                    </h2>
                    <div className="mt-4 flex flex-row space-x-1 items-center lg:space-x-8">
                            <button onClick={handleReport} className={TOOL_BUTTON_STYLE}>View Reports</button>
                            <button onClick={newAnnouncement} className={TOOL_BUTTON_STYLE}>New Announcement</button>
                            <button onClick={manageAccount} className={TOOL_BUTTON_STYLE}>Manage Accounts</button>
                            <button onClick={manageAbbey} className={TOOL_BUTTON_STYLE}>Manage Abbey Slots</button>
                    </div>
                    <div className="mt-8 w-[95%] h-36 lg:w-[70%]">
                        <h1>My Bookings</h1>
                        <MoonLoader className="mx-auto mt-20" loading={isLoading}/>
                        {!isLoading && <div className="flex flex-col space-y-4 overflow-y-auto h-64">
                            {userBookings.map(x => (
                                <UpcomingBooking setState={setUserBookings} date={x.date} time={x.time} booking_id={x.id} user_id={user.id}/>
                            ))}
                        </div>}
                    </div>
                </div> 
                <button
                        className="mt-auto mb-4 self-center text-xl text-red-600"
                        onClick={handleLogout}>
                            Logout
                    </button>
                <ToastContainer />
            </div>
        </Layout>
    );
}
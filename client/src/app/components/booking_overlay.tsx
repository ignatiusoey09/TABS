import { IBookingData } from "../dashboard/page"
import { useAuthContext } from "../hooks/useAuthContext"
import { useRouter } from "next/navigation"

interface IProps {
    datetime: IBookingData,
    callback: () => void
}

export default function BookingOverlay({datetime, callback} : IProps) {
    const { state } = useAuthContext();
    const router = useRouter();

    const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const handleBooking = async () => {
        try {
            const response = await fetch(`${backend_url}/api/booking/make_booking`, {
                headers: {
                    'Content-Type': 'application/JSON',
                    'Authorization': `Bearer ${state.user?.token}` 
                },
                method: 'POST',
                body: JSON.stringify({
                    user: state.user?.user,
                    date: datetime.date.toDateString(),
                    time: datetime.startTime
                })
            });

            const res_json = await response.json();
            console.log(res_json["status"]);
            callback();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div className="fixed top-[30%] left-[12.5%] w-72 h-60 bg-white z-30 rounded flex flex-col p-3 lg:left-[50%]">
                <h2>Confirm Booking?</h2>
                <div className="">
                    <h2>{datetime.date.toDateString()}</h2>
                    <h3>{datetime.startTime + "-" + datetime.endTime}</h3>
                </div>
                <div className="mt-auto w-full flex flex-row p-1">
                    <button className="bg-gray-300 p-1 rounded" onClick={callback}>Cancel</button>
                    <div className="grow"></div>
                    <button className="bg-tembu-lightgreen text-white p-1 rounded" onClick={handleBooking}>Confirm</button>
                </div>
            </div>
            <div className="fixed w-screen h-screen z-20 bg-gray-400/75"></div>
        </div>
    );
}

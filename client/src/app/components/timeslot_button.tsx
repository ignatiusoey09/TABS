import { useRouter } from "next/navigation";
import { useAuthContext } from "../hooks/useAuthContext";
import { IBookingData } from "../dashboard/page";

interface IProps {
    timeslot: {
        time: string,
        is_booked: boolean
    },
    date: Date,
    handleModal: () => void,
    callback: (arg0:IBookingData) => void
};

export default function TimeslotButton({timeslot, date, handleModal, callback}: IProps) {
    const router = useRouter();
    const { state } = useAuthContext();

    function getEndTime(time_str:string) {
        var ampm = time_str.split(" ")[1];
        const hour = Number(time_str.split(":")[0]);

        let endHour;
        if (hour + 2 > 12) {
            //flip ampm and rollover hour
            ampm = (ampm == "AM") ? "PM" : "AM";
            endHour = (hour + 2) - 12;
        } else {
            endHour = hour + 2;
        }

        return `${endHour}:00 ${ampm}`;
    }

    const handleClick = async () => {
        handleModal();
        const date_string = date.toDateString();
        callback({
            date: date,
            startTime: timeString,
            endTime: endTime
        });
        /*
        try {
            const response = await fetch("http://localhost:8080/api/booking/make_booking", {
                headers: {
                    'Content-Type': 'application/JSON',
                    'Authorization': `Bearer ${state.user?.token}` 
                },
                method: 'POST',
                body: JSON.stringify({
                    date: date_string,
                    time: timeString
                })
            });

            const res_json = await response.json();
            console.log(res_json);
            router.replace("/dashboard");
        } catch (e) {
            console.log(e);
        } */
       
    }

    const timeString = timeslot["time"]; //format: 10:00 AM
    const is_booked = timeslot["is_booked"];
    const endTime = getEndTime(timeString);

    return (
        <button 
            className="border-2 rounded-md w-[90%] h-[60%] lg:w-[70%] h-[83%] disabled:bg-zinc-50 disabled:text-zinc-300" 
            disabled={is_booked}
            onClick={handleClick}
        >
            <h2>{`${timeString}-${endTime}`}</h2>
        </button>
    );
}
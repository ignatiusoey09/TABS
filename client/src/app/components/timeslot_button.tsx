import { IBookingData } from "../dashboard/page";

interface IProps {
    timeslot: {
        time: string,
        is_booked: boolean
        user?: {
            email: string,
            name: string,
            role: string
        },
    },
    date: Date,
    handleModal: () => void,
    callback: (arg0:IBookingData) => void
};

export default function TimeslotButton({timeslot, date, handleModal, callback}: IProps) {

    function getEndTime(time_str:string) {
        var ampm = time_str.split(" ")[1];
        const hour = Number(time_str.split(":")[0]);

        let endHour;
        if (hour == 12) {
            // roll over hours
            endHour = 2;
        } else if (hour + 2 == 12) {
            //flip ampm
            endHour = 12;
            ampm = (ampm == "AM") ? "PM" : "AM";
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
            {is_booked && <h2>Booked by: {timeslot.user?.name}</h2>}
        </button>
    );
}
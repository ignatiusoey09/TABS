import CrossIcon from "public/cross_icon.svg";
import { useState } from "react";
import DeleteBookingModal from "./delete_booking_modal";

interface IProps {
    date: string,
    time: string,
    booking_id: string
}

export default function UpcomingBooking({date, time, booking_id}:IProps) {
    const [isModalOpen, setModalOpen] = useState(false);

    const arr = date.split(" ");
    const day = arr[0];
    const month = arr[1];
    const date_number = arr[2];
    
    const dayToLong = new Map([
        ["Sun", "Sunday"],
        ["Mon", "Monday"],
        ["Tue", "Tuesday"],
        ["Wed", "Wednesday"],
        ["Thu", "Thursday"],
        ["Fri", "Friday"],
        ["Sat", "Saturday"],
    ]);

    const dayLong = dayToLong.get(day);

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
    const endTime = getEndTime(time);
    const time_period = `${time} - ${endTime}`;

    return (
        <div className="flex flex-row rounded border border-2 border-tembu-green p-2 divide-x">
            <div className="flex flex-col justify-items-center w-12 mr-2 py-1">
                <h3 className="text-center text-s/2">{month}</h3>
                <h3 className="text-center text-2xl/4 font-medium pb-1">{date_number}</h3>
            </div>
            <div className="pl-2 flex flex-row w-full">
                <div className="flex flex-col">
                    <h2 className="text-xs mt-1">{dayLong}</h2>
                    <div className="h-1/4"></div>
                    <h2 className="text-xs">{time_period}</h2>
                </div>
                <div className="ml-auto relative">
                    {isModalOpen && <DeleteBookingModal closeModal={()=>setModalOpen(false)} booking_id={booking_id} date={date} time={time_period}/>}
                    <button className="h-auto" onClick={()=>setModalOpen(true)}>
                        <CrossIcon/>
                    </button>
                </div>
            </div>
        </div>
    );
}
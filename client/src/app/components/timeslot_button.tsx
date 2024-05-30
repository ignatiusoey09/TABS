interface IProps {
    timeslot: {
        time: string,
        is_booked: boolean
    }
};

export default function TimeslotButton({timeslot}: IProps) {

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

    const timeString = timeslot["time"]; //format: 10:00 AM
    const is_booked = timeslot["is_booked"];
    const endTime = getEndTime(timeString);

    return (
        <button className="border-2 rounded-md w-[80%] h-[80%] disabled:bg-zinc-50 disabled:text-zinc-300" disabled={is_booked}>
            <h2>{`${timeString}-${endTime}`}</h2>
        </button>
    );
}
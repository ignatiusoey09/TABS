interface IProps {
    datetime: {
        date: Date,
        startTime: string,
        endTime: string
    },
    callback: () => void
}

export default function BookingOverlay({datetime, callback} : IProps) {

    return (
        <div>
            <div className="fixed top-[30%] left-[50%] w-72 h-60 bg-white z-30 rounded flex flex-col p-3">
                <h2>Confirm Booking?</h2>
                <div className="">
                    <h2>{datetime.date.toDateString()}</h2>
                    <h3>{datetime.startTime + "-" + datetime.endTime}</h3>
                </div>
                <div className="mt-auto w-full flex flex-row p-1">
                    <button className="bg-gray-300 p-1 rounded" onClick={callback}>Cancel</button>
                    <div className="grow"></div>
                    <button className="bg-tembu-lightgreen text-white p-1 rounded">Confirm</button>
                </div>
            </div>
            <div className="fixed w-screen h-screen z-20 bg-gray-400/75"></div>
        </div>
    );
}
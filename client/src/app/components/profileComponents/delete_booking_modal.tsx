interface IProps {
    closeModal: () => void
    booking_id: string
    date: string,
    time: string
}

export default function DeleteBookingModal ({closeModal, booking_id, date, time}:IProps) {
    return (
        <>
        <div className="fixed top-[35%] left-[50%] flex flex-col w-64 h-48 z-50 bg-white border rounded p-2">
            <h2>Delete Booking</h2>
            <h2>Confirm delete booking at: </h2>
            <h2 className="text-sm">{date}</h2>
            <h2 className="text-sm">{time}</h2>
            <div className="flex flex-row mt-auto">
                <button className="mr-auto border rounded bg-gray-400 text-white p-1" onClick={closeModal}>Cancel</button>
                <button className="ml-autp border rounded bg-red-600 text-white p-1">Delete</button>
            </div>
        </div>
        <div className="fixed top-0 left-0 h-screen w-screen z-40 bg-zinc-400/75" onClick={closeModal}></div>
        </>
    );
}
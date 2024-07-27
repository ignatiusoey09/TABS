import { useAuthContext } from "./useAuthContext";

interface IParams {
    setIsLoading: (value:boolean) => void,
}

export const useGetBookingsByUserId = ({setIsLoading}:IParams) => {
    //retrieve saved auth details
    const { state } = useAuthContext();
    const user = state.user;


    const getBookings = async (user_id:string) => {
        setIsLoading(true);

        try {
            const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(`${backend_url}/api/booking/get_user_bookings`, {
                //adding jwt token for api request auth
                headers: {
                    'Content-Type': 'Application/JSON',
                    'Authorization': `Bearer ${user?.token}`
                },
                method: "POST",
                body: JSON.stringify({user_id})
            });

            const response_data = await response.json();
            if (!response.ok) {
                //error occured
                console.log(response_data.error);
                throw new Error("Server error");
            } else {
                //200 ok
                const myBookings = response_data["bookings"];
                const dates = Object.keys(myBookings);
                var arr = [];
                for (var d of dates) {
                    var bookings_by_date = myBookings[d]; //timeslots on date d
                    let obj;
                    for (let i = 0; i < bookings_by_date.length; i++) {
                        obj = {date: d, time: bookings_by_date[i].time, id: bookings_by_date[i]._id};
                        arr.push(obj);
                    }
                }
                setIsLoading(false);
                return arr;
            }

        } catch (e) {
            setIsLoading(false);
            console.log(e);
            return [];
        }

    }

    return { getBookings };
}


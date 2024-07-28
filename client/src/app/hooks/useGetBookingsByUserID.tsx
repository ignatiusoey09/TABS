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
                const dates = Object.keys(myBookings); //string array of all dates where this user has a booking
                var arr = []; 
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                for (var d of dates) {
                    var d_as_Date = new Date(d);
                    if (d_as_Date >= today) {
                        var bookings_by_date = myBookings[d]; //timeslots on date d
                        let obj;
                        for (let i = 0; i < bookings_by_date.length; i++) {
                            var time = bookings_by_date[i].time;
                            obj = {date: d, time: time, id: bookings_by_date[i]._id};
                            arr.push(obj);
                        }
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


import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

export const useGetTimeslots = () => {
    //state is a json with 'user' json field
    const { state } = useAuthContext();
    const user = state.user;

    const { logout } = useLogout();
   
    const getTimeslots = async (date:Date) => {
        const query_date = (date as Date).toDateString();
        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (user) {
            try {
                const response = await fetch(`${backend_url}/api/booking/get_date_timeslots`, {
                    //adding jwt token for api request auth
                    headers: {
                        'Content-Type': 'application/JSON',
                        'Authorization': `Bearer ${user.token}`
                    },
                    method: "POST",
                    body: JSON.stringify({date: query_date})
                });

                const response_data = await response.json();
                if (!response.ok) {
                    if (response_data.error == "Token Expired") {
                        localStorage.removeItem("user");
                        console.log("Token expired");
                        logout();
                    }
                } else {
                    console.log(response_data["timeslots"]);
                    return response_data["timeslots"];
                }
            } catch {
                console.log("error contacting server");
            }
        }
    }
    return getTimeslots;
}

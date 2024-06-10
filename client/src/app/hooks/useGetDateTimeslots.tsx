import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useGetTimeslots = () => {
    //state is a json with 'user' json field
    const { state } = useAuthContext();
    const user = state.user;

    const { logout } = useLogout();
    const router = useRouter();
    const [isLoading, set_isLoading] = useState<boolean>(true);
   
    const getTimeslots = async (date:Date) => {
        set_isLoading(true);
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
                    set_isLoading(false);
                    return response_data["timeslots"];
                }
            } catch {
                console.log("error contacting server");
                return [];
            }
        } else {
            //not logged in
            set_isLoading(false);
            console.log("not logged in");
            router.replace("/");
            return [];
        }
    }
    return { getTimeslots, isLoading };
}

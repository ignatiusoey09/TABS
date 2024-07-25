import { useAuthContext } from "./useAuthContext";

export const useDeleteBooking = () => {

    const {state} = useAuthContext();
    const user = state.user;

    const deleteBooking = async (date:string, booking_id:string) => {
        try {
            const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
            const response = await fetch(`${backend_url}/api/booking/delete_booking`, {
                //adding jwt token for api request auth
                headers: {
                    'Content-Type': 'Application/JSON',
                    'Authorization': `Bearer ${user?.token}`
                },
                method: "DELETE",
                body: JSON.stringify({date, booking_id})
            });

            const res_json = await response.json();;

            if (response.ok) {
                console.log(res_json.message);
                return 200;
            } else {
                console.log(res_json.error);
                return 400;
            }
        } catch (e) {
            console.log(e);
            return 400;
        }
    }

    return { deleteBooking };
}
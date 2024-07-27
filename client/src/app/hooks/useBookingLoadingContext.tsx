import { useContext } from "react"
import { LoadingContext } from "../context/bookingLoadingContext"

export const useBookingLoadingContext = () => {
    const context = useContext(LoadingContext);

    if (context == null) {
        throw Error("useBookingLoadingContext must be used withing BookingLoadingProvider")
    } else {
        return context;
    }
}
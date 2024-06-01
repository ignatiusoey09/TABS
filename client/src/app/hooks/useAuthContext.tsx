import { useContext } from "react";
import { AuthContext } from "../context/authContext";


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (context == null) {
        throw Error("useAuthContext must be used inside an AuthContextProvider");
    } else {
        return context;
    }
}


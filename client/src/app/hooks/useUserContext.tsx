import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context == null) {
        throw Error("useUserContext must be used inside a UserContextProvider");
    }
    else{
        return context;
    }
}
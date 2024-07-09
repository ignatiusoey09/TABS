import { useContext } from "react";
import { AnnouncementContext } from "../context/announcementContext";

export const useAnnouncementContext = () => {
    const context = useContext(AnnouncementContext);
    if (context == null) {
        throw Error("useAnnouncementContext must be used inside a AnnouncementContextProvider");
    }
    else{
        return context;
    }
}
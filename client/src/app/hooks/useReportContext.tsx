import { useContext } from "react";
import { ReportContext } from "../context/reportContext";

export const useReportContext = () => {
    const context = useContext(ReportContext);
    if (context == null) {
        throw Error("useReportContext must be used inside a ReportContextProvider");
    }
    else{
        return context;
    }
}
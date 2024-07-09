'use client'

import { useRouter } from "next/router";
import { string } from "prop-types";
import { createContext, useReducer, Dispatch, useEffect } from "react";

// defining interface
interface IContextProps {
    stateAnn: IState,
    dispatch: Dispatch<IAction>
}

export const ReportContext = createContext({} as IContextProps);

interface Report {
    _id?: string,
    name: string,
    item: string,
    description: string,
    createdAt?: string
    updatedAt?: string
}

interface IAction {
    readonly type: string,
    readonly payload: Report | Report[] | [] | any
}

interface IState {
    reports: Report[] | []
}

//reducer function defines how state should be updated based on action
export const reportReducer = (state:IState, action:IAction): IState => {
    switch (action.type) {
        case 'SHOW_REPORTS':
            return {
                reports: action.payload.sort((a: any,b: any) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
            }
            break;
        case 'UPLOAD_REPORT':
            return {
                reports: [action.payload, ...state.reports]
            }
        case 'RESOLVE_REPORT':
            return {
                reports: state.reports.filter((r) => r._id !== action.payload._id)
            }
        default:
            return state
    }
};

// defining interface type for children prop
interface IChildrenProps {
    children: React.ReactNode

}

//the react component that will wrap the reports page in order to render latest list of reports
export const ReportContextProvider = ({ children }:IChildrenProps) => {
    const [stateAnn, dispatch] = useReducer(reportReducer, {
        reports: []
    });

   

    //runs everytime authcontext state changes
    console.log("ReportContext state: ", stateAnn);

    return (
        <ReportContext.Provider value={{stateAnn, dispatch }}>
            { children }
        </ReportContext.Provider>
    );
}
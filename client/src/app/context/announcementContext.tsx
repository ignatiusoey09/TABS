'use client'

import { useRouter } from "next/router";
import { string } from "prop-types";
import { createContext, useReducer, Dispatch, useEffect } from "react";

// defining interface
interface IContextProps {
    stateAnn: IState,
    dispatch: Dispatch<IAction>
}

export const AnnouncementContext = createContext({} as IContextProps);



//defining type interfaces for reducer function
interface Announcement {
    _id?: string,
    name: string,
    role: string,
    title: string,
    message: string,
    createdAt?: string
    updatedAt?: string
}

interface IAction {
    readonly type: string,
    readonly payload: Announcement | Announcement[] | [] | any
}

interface IState {
    announcements: Announcement[] | []
}

//reducer function defines how state should be updated based on action
export const announcementReducer = (state:IState, action:IAction): IState => {
    switch (action.type) {
        case 'SHOW_ANNOUNCEMENTS':
            return {
                announcements: action.payload.sort((a: any,b: any) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
            }
            break;
        case 'UPLOAD_ANNOUNCEMENT':
            return {
                announcements: [action.payload, ...state.announcements]
            };
            break
        case 'DELETE_ANNOUNCEMENT':
                return {
                    announcements: state.announcements.filter((a) => a._id !== action.payload._id)
                };
            
            break;
        case 'UPDATE_ANNOUNCEMENT':
            return {
                announcements: state.announcements.map((a) => a._id === action.payload._id ? action.payload : a)
            }
        default:
            return state;
    }
    return state;
};

//defining interface type for children prop
interface IChildrenProps {
    children: React.ReactNode

}

//the react component that will wrap the reports page in order to render latest list of reports
export const AnnouncementContextProvider = ({ children }:IChildrenProps) => {
    const [stateAnn, dispatch] = useReducer(announcementReducer, {
        announcements: []
    });

   

    //runs everytime authcontext state changes
    console.log("AnnouncementContext state: ", stateAnn);

    return (
        <AnnouncementContext.Provider value={{stateAnn, dispatch }}>
            { children }
        </AnnouncementContext.Provider>
    );
}
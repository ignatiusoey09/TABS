'use client'

import { useRouter } from "next/router";
import { string } from "prop-types";
import { createContext, useReducer, Dispatch, useEffect } from "react";

// defining interface
interface IContextProps {
    stateAnn: IState,
    dispatch: Dispatch<IAction>
}

export const UserContext = createContext({} as IContextProps);

interface User {
    _id?: string,
    email: string,
    name: string,
    password: string,
    role: string
}

interface IAction {
    readonly type: string,
    readonly payload: User | User[] | [] | any
}

interface IState {
    users: User[] | []
}

//reducer function defines how state should be updated based on action
export const userReducer = (state:IState, action:IAction): IState => {
    switch (action.type) {
        case 'SHOW_USERS':
            return {
                users: action.payload.sort((a: any,b: any) => (a.name) - (b.name))
            }
            break;
        case 'UPLOAD_USER':
            return {
                users: [action.payload, ...state.users]
            }
        case 'REMOVE_USER':
            return {
                users: state.users.filter((r) => r._id !== action.payload._id)
            }
        case 'UPGRADE_USER':
            return {
                users: state.users.map((u) => u._id === action.payload._id ? action.payload : u)
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
export const UserContextProvider = ({ children }:IChildrenProps) => {
    const [stateAnn, dispatch] = useReducer(userReducer, {
        users: []
    });

   

    //runs everytime authcontext state changes
    console.log("ReportContext state: ", stateAnn);

    return (
        <UserContext.Provider value={{stateAnn, dispatch }}>
            { children }
        </UserContext.Provider>
    );
}
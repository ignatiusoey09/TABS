'use client'

import { createContext, useReducer, Dispatch } from "react";

//have to define this interface for some reason idk
interface IContextProps {
    state: IState,
    dispatch: Dispatch<IAction>
}

export const AuthContext = createContext({} as IContextProps);

//defining type interfaces for reducer function
interface IAction {
    readonly type: string,
    readonly payload: {
        user: JSON,
        token: string
    } | null
}

interface IState {
    user: {
        user: JSON,
        token: string
    } | null
}

//reducer function defines how state should be updated based on action
export const authReducer = (state:IState, action:IAction) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

//defining interface type for children prop
interface IChildrenProps {
    children: React.ReactNode
}

//the react component that will wrap our entire app in order to provide
//global context
export const AuthContextProvider = ({ children }:IChildrenProps) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    //runs everytime authcontext state changes
    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
}
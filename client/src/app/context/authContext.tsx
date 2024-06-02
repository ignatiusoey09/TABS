'use client'

import { useRouter } from "next/navigation";
import { createContext, useReducer, Dispatch, useEffect } from "react";

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
        user: {
            email: string,
            role: string,
        },
        token: string
    } | null
}

interface IState {
    user: {
        user: {
            email: string,
            role: string,
        }
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
    const router = useRouter();
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    useEffect(() => {
        const retrieve = localStorage.getItem("user");

        if (retrieve) {
            const user = JSON.parse(retrieve);
            dispatch({type: 'LOGIN', payload: user});
            router.push('/dashboard');
        }

    }, [])

    //runs everytime authcontext state changes
    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
}
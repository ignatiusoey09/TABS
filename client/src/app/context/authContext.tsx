'use client'

import { jwtDecode } from "jwt-decode";
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
        console.log("retrieved user");
        const retrieve = localStorage.getItem("user");

        if (retrieve) {
            const user = JSON.parse(retrieve);

            //check if token expiry
            const token = user.token;
            const exp = jwtDecode(token).exp!;
            const now = new Date();
            const TWO_HOURS = 2 * 60 * 60 * 1000; //in ms
            if (exp - now.valueOf() < TWO_HOURS) {
                // jwt expired, or will expire within 2 hr
                console.log("redirected");
                localStorage.clear();
                router.replace("/");
            } else {
                dispatch({type: 'LOGIN', payload: user});
                router.push('/dashboard');
            }
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
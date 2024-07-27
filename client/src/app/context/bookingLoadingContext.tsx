'use client'

import { createContext, useState } from "react";

interface IContextProps {
    isLoading: boolean,
    setIsLoading: (value:boolean) => void,
}

interface IChildrenProps {
    children: React.ReactNode
}

export const LoadingContext = createContext({} as IContextProps);

export const LoadingProvider = ({children}:IChildrenProps) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}
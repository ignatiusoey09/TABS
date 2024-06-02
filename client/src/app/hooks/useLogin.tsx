'use client'

import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useRouter } from "next/navigation";



export const useLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { dispatch } = useAuthContext();
    const router = useRouter();

    const login = async (formData:FormData) => {
        setIsLoading(true);
        setError(null);

        const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backend_url}/api/user/login`, {
            method: 'POST',
            body: formData
        });

        //response format:
        //{user, token} OR {error}
        const res_json = await response.json();

        //if response code is NOT 200
        if (!response.ok) {
            setIsLoading(false);
            setError(res_json.error);
        } else {
            //save auth user in local storage
            localStorage.setItem("user", JSON.stringify(res_json));

            dispatch({type: 'LOGIN', payload: res_json});
            setIsLoading(false);
            router.push("/dashboard");
        }

    }

    return { isLoading, error, login };
}
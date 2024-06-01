import { useState } from "react";
import { useAuthContext } from "./useAuthContext";



export const useLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [error, setError] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (formData:FormData) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/user/login", {
            method: 'POST',
            headers: {'Content-Type':'multipart/formdata'},
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
        }

    }

    return { isLoading, error, login };
}
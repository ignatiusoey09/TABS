import { useAuthContext } from "./useAuthContext"
import { useRouter } from "next/navigation";


export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT', payload: null});
        router.push("/");
    }

    return { logout };
}
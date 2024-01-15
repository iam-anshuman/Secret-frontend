import { useAuthContext } from "./useAuthContext";

const useLogOut = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: "LOGOUT" });
    }

    return {logout};
}

export {useLogOut};
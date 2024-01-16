import { useState} from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {   
    const [Error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const {dispatch} = useAuthContext();

    const signup = async (fullname,email,password)=>{

        setError(null);
        setIsLoading(true);

        // console.log("Signup Hook");
        try {
            
        const response = await fetch("https://secret-service-pb1n.onrender.com/auth/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullname,email,password})
        });
        const json = await response.json();
        
        // console.log(json);

        if(!response.ok){

            setError(json.message);
            setIsLoading(false);

        }
        if(response.ok){

            setIsLoading(false);
            localStorage.setItem('token',JSON.stringify(json));
            dispatch({type:"LOGIN",payload:json});

        }
    } catch (error) {
            setError(error.message);
    }finally {
            setIsLoading(false);
    }
}

    return {signup,isLoading,Error};
}

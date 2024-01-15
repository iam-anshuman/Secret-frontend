import { createContext,useReducer } from "react";

export const SecretContext = createContext();

export const secretReducer = (state,action)=>{
    switch(action.type){
        case "GET_SECRETS":

            return {secrets:action.payload};

        case "ADD_SECRET":

            return {
               secrets: [ ...state.secrets, action.payload]
            };
        case "DELETE_SECRET":
            return { 
                secrets: state.secrets.filter(secret => secret.id!== action.payload)
            }

        default:
            return state;
    }
}

export const SecretContextProvider = ({children})=>{

    const [secrets,dispatch] = useReducer(secretReducer,{
        secrets:null
    });

    return(
        <SecretContext.Provider value={{secrets,dispatch}}>
            {children}
        </SecretContext.Provider>
    )
}
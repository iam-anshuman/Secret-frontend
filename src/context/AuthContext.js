import { createContext,useEffect,useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {user:action.payload,isLoggedIn:true};

        case "LOGOUT":
            return {user:null,isLoggedIn:false};

        default:
            return state;
        
    }
}

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user:null
  });

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('token'));
    if(user){
      dispatch({type:"LOGIN",payload:user});
    }
  },[]);

  console.log("Authcontext State: ", state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}
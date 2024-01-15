import { useContext } from "react";
import { SecretContext } from "../context/secretContext";

export const useSecretContext = () => {
    const context = useContext(SecretContext);

    if (!context) {
        throw Error("useSecretContext must be used within a SecretContextProvider");
    }
    return context;
}
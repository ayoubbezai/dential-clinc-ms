import { useAuth } from "./useAuth";

export const useRole = () => {
    const { user } = useAuth();
    console.log("use role", user)
    const role = user && user["role"] ? user["role"] : null;

    return { role };
};

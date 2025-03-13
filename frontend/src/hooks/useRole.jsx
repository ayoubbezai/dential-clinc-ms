import { useAuth } from "./useAuth";

export const useRole = () => {
    const { user } = useAuth();
    console.log("use auth", user)
    console.log("use role", user.role)
    console.log("use role", user["role"])

    return user ? user["role"] : " ";
};

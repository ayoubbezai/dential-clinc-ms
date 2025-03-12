import { useAuth } from "./useAuth";

export const useRole = () => {
    const { user } = useAuth();

    return user["role"] ||null;
};

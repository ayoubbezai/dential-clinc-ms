import { useAuth } from "./useAuth";

export const useRole = () => {
    const { user  } = useAuth();
    const role = user && user["role"] ? user["role"] : null;

    return {role};
};

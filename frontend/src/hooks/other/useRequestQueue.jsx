import { useState, useCallback } from 'react';

const useRequestQueue = () => {
    const [isRequesting, setIsRequesting] = useState(false); // Flag for tracking requests

    const requestQueue = useCallback(async (requestFn) => {
        // Only allow one request at a time
        if (isRequesting) {
            return; // Skip if already processing a request
        }

        setIsRequesting(true);
        try {
            await requestFn(); // Execute the request
        } catch (error) {
            console.error(error); // Handle errors
        } finally {
            setIsRequesting(false); // Reset flag after request is complete
        }
    }, [isRequesting]);

    return {requestQueue};
};

export default useRequestQueue;

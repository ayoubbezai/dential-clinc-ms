import React, { useCallback, useEffect, useState } from 'react'
import _ from "lodash";
import { ConversationService } from '@/services/shared/ConcersationsService';

const useConversation = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [conversations, setConversations] = useState([]);

    const fetchConversation = useCallback(
        _.debounce(async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await ConversationService.getConversations(perPage, page);
            console.log(data);

            if (data) {
                setConversations(prev => [
                    ...(page === 1 ? [] : prev),
                    ...(Array.isArray(data.data) ? data.data : [])
                ]);
                setPagination(data?.pagination || {});

            } else {
                console.error(error);
                setError(error || 'An error occurred while fetching conversations.');

            }


            setLoading(false);
        }, 0),
        [perPage, page]
    );

    useEffect(() => {
        fetchConversation();
    }, [fetchConversation, page]);

    return {
        page,
        setPage,
        perPage,
        setPerPage,
        loading,
        error,
        conversations,
        pagination,
        fetchConversation,
    };
}

export default useConversation;

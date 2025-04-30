import { useState, useEffect } from 'react';
import { ConversationService } from '@/services/shared/ConcersationsService';

const useConversation = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [conversations, setConversations] = useState([]);
    const [prevSearch, setPrevSearch] = useState("");

    const fetchConversation = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await ConversationService.getConversations(perPage, page, search);

            if (error) {
                throw new Error(error);
            }

            if (data) {
                setConversations(prev => {
                    if (search !== prevSearch || page === 1) {
                        return data?.data || [];
                    }
                    return [...prev, ...(data?.data || [])];
                });
                setPagination(data?.pagination || {});
                setPrevSearch(search); 
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'Error fetching conversations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (search !== prevSearch) {
            setPage(1);
        }
    }, [search]);

    useEffect(() => {
        fetchConversation();
    }, [page, perPage, search]);

    return {
        page,
        setPage,
        perPage,
        setPerPage,
        search,
        setSearch,
        loading,
        error,
        conversations,
        pagination,
        fetchConversation,
    };
};

export default useConversation;
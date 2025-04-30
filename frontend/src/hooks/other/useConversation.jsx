import { useState, useEffect, useCallback } from 'react';
import { ConversationService } from '@/services/shared/ConcersationsService';
import _ from 'lodash';

const useConversation = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [conversations, setConversations] = useState([]);
    const [prevSearch, setPrevSearch] = useState("");

    const filterDuplicates = (current, incoming) => {
        const currentIds = current.map(conv => conv.id);
        return incoming.filter(conv => !currentIds.includes(conv.id));
    };

    const fetchConversation = useCallback(
        _.debounce(async()=>{
            setLoading(true);
            setError(null);

            try {
                const { data, error } = await ConversationService.getConversations(perPage, page, search);

                if (error) {
                    throw new Error(error);
                }

                if (data) {
                    setConversations(prev => {
                        const newData = data?.data || [];

                        if (search !== prevSearch || page === 1) {
                            return newData;
                        } else {
                            const uniqueNewData = filterDuplicates(prev, newData);
                            return [...prev, ...uniqueNewData];
                        }
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
        }, 0), [page, perPage, search])

        


    useEffect(() => {
        if (search !== prevSearch) {
            setPage(1);
        }
    }, [search]);

    useEffect(() => {
        fetchConversation();
    }, [fetchConversation]);

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
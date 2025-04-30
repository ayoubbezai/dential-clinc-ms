import { useState, useEffect } from 'react';
import { ConversationService } from '@/services/shared/ConcersationsService';

const useMessages = (id) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({});
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        if (!id) return;

        setLoading(true);
        setError(null);

        try {
            const { data, error } = await ConversationService.getConversation(id, perPage, page);

            if (error) {
                throw new Error(error);
            }

            if (data) {
                setMessages(prev => {
                    if (page === 1) {
                        return data?.data || [];
                    }
                    const newMessages = data?.data || [];
                    return [...prev, ...newMessages];
                });
                setPagination(data?.pagination || {});
                setUser(data?.user || {});
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'Error fetching Messages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMessages();
        }
    }, [page, perPage, id]);

    return {
        page,
        setPage,
        perPage,
        setPerPage,
        loading,
        error,
        messages,
        pagination,
        user,
        fetchMessages,
        setMessages
    };
};

export default useMessages;
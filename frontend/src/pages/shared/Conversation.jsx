import useMessages from '@/hooks/other/useMessages';
import { ConversationService } from '@/services/shared/ConcersationsService';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
const Conversation = () => {
    const { id } = useParams();
    const { messages, loading, error, user, mutate, pagination, setPage } = useMessages(id);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const scrollRef = useRef(null);
    const topObserverRef = useRef(null);
    const [initialLoadDone, setInitialLoadDone] = useState(false);
    const prevScrollHeight = useRef(0);

    const messageList = messages || [];



    const pusher = new Pusher(import.meta.env.VITE_REVERB_APP_KEY, {
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT,
        forceTLS: false,
        disableStats: true,
        enabledTransports: ["ws", "wss"],
        cluster: "",
    });

    const channel = pusher.subscribe(`test-channel`);
    channel.bind('pusher:subscription_succeeded', () => {
        console.log("✅ Subscribed to chat channel!");
    });





    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || isSending) return;

        setIsSending(true);
        try {
            const { data, error } = await ConversationService.sendMessage(id, message);
            if (error) throw new Error(error.message || 'Failed to send message');
            if (data) {
                setMessage('');
                mutate(); // refetch messages
            }
        } catch (err) {
            console.error('Send message error:', err);
            toast.error(err.message || 'Error sending message');
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const checkLoadMore = useCallback(() => {
        return !loading && pagination?.has_more_pages;
    }, [loading, pagination]);

    useEffect(() => {
        if (!initialLoadDone && !loading && scrollRef.current?.scrollHeight > scrollRef.current?.clientHeight) {
            setInitialLoadDone(true);
        }
    }, [messages, loading]);

    // Setup observer at top of message list
    useEffect(() => {
        if (!topObserverRef.current || !checkLoadMore) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && checkLoadMore()) {
                    // Save scroll height before load
                    if (scrollRef.current) {
                        prevScrollHeight.current = scrollRef.current.scrollHeight;
                    }
                    setPage(prev => prev + 1);
                }
            },
            {
                root: scrollRef.current,
                threshold: 0,
            }
        );

        observer.observe(topObserverRef.current);

        return () => {
            observer.disconnect();
        };
    }, [checkLoadMore, setPage]);

    return (
        <div className='w-5/6 mx-auto bg-gray-50 h-screen flex flex-col justify-between'>
            {/* Header */}
            <header className='bg-white p-3 px-6 border-b border-gray-200 flex items-center space-x-3 sticky top-0 z-10'>
                <div className="flex-shrink-0 relative">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                </div>
                <div>
                    <h2 className='font-medium text-gray-800 text-sm'>{user?.name || 'Unknown User'}</h2>
                    <p className='text-xs text-gray-400'>Online now</p>
                </div>
            </header>

            {/* Messages */}
            <main
                ref={scrollRef}
                className='flex-1 flex flex-col-reverse overflow-y-auto p-3 px-6'
            >
                <div className='space-y-2'>
                    {/* Top sentinel for observer */}
                    <div ref={topObserverRef} className="h-1 w-full" />

                    {loading && messageList.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500 text-sm">Loading messages...</p>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-red-500 text-sm">Error loading messages</p>
                        </div>
                    ) : messageList.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500 text-sm">No messages yet</p>
                        </div>
                    ) : (
                        messageList.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.type === 'received' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs px-3 py-1.5 rounded-lg text-sm ${msg.type === 'received'
                                        ? 'bg-blue-500 text-white rounded-br-none'
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}
                                >
                                    <p className="leading-tight">{msg.message}</p>
                                    <p className="text-xs mt-0.5 opacity-70 text-right">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className='bg-white p-3 border-t border-gray-200 sticky bottom-0 px-6'>
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 border border-gray-200 rounded-full py-1.5 px-4 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        disabled={isSending}
                    />
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white rounded-full p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        disabled={isSending || !message.trim()}
                    >
                        {isSending ? (
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                        )}
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default Conversation;

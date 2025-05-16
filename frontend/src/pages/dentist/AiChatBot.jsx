import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import api from '@/services/other/api';

const agentService = {
    async sendMessage(question, deepSearch = false) {
        try {
            const response = await api.post("/ask", { question, deepSearch });
            return { data: response.data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error.response?.data?.message || error.message || "Failed to get response"
            };
        }
    }
};
//this if we wanna keep the messages in local storage

const useMessageStorage = (key, initialValue) => {
    const [messages, setMessages] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        }
        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(messages));
    }, [key, messages]);

    return [messages, setMessages];
};

const AiChatBot = () => {
    const { t } = useTranslation('ai_chat');
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [deepSearch, setDeepSearch] = useState(false);
    const [error, setError] = useState(null);
    const [typingText, setTypingText] = useState('');
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const typingIntervalRef = useRef(null);

    // Scroll to bottom when messages change or chat opens
    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (isLoading) {
            const phrases = [
                t('typing.thinking'),
                t('typing.analyzing'),
                t('typing.processing'),
            ];
            let i = 0;
            let charIndex = 0;
            let isDeleting = false;

            typingIntervalRef.current = setInterval(() => {
                const currentPhrase = phrases[i];

                if (isDeleting) {
                    setTypingText(currentPhrase.substring(0, charIndex - 1));
                    charIndex--;

                    if (charIndex === 0) {
                        isDeleting = false;
                        i = (i + 1) % phrases.length;
                    }
                } else {
                    setTypingText(currentPhrase.substring(0, charIndex + 1));
                    charIndex++;

                    if (charIndex === currentPhrase.length) {
                        setTimeout(() => isDeleting = true, 1000);
                    }
                }
            }, 100);
        } else {
            setTypingText('');
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
        }

        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current);
            }
        };
    }, [isLoading, t]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const clearChat = () => {
        setMessages([]);
        setError(null);
    };

    const toggleDeepSearch = () => {
        setDeepSearch(!deepSearch);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading) return;

        const userMessage = {
            text: inputValue,
            sender: 'user',
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            const { data, error: apiError } = await agentService.sendMessage(inputValue, deepSearch);

            if (apiError) {
                throw new Error(apiError);
            }

            const botMessage = {
                text: data?.answer?.answer || t('bot.unable_to_process'),
                sender: 'bot',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            setError(err.message);
            const errorMessage = {
                text: t('bot.connection_issue'),
                sender: 'bot',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed bottom-5 right-8 z-50">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="w-96 h-[32rem] bg-white rounded-xl shadow-xl flex flex-col border border-gray-200 "
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-white animate-pulse' : 'bg-green-400'}`}></div>
                            <h3 className="font-semibold text-sm">{t('header.title')}</h3>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={clearChat}
                                className="text-white hover:text-gray-200 p-1 focus:outline-none transition-colors rounded-full hover:bg-blue-700 w-6 h-6 flex items-center justify-center"
                                title={t('header.clear_chat')}
                                aria-label={t('header.clear_chat')}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <button
                                onClick={toggleChat}
                                className="text-white hover:text-gray-200 text-xl focus:outline-none transition-colors rounded-full hover:bg-blue-700 w-6 h-6 flex items-center justify-center"
                                aria-label={t('header.close')}
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Deep search indicator */}
                    {deepSearch && (
                        <div className="bg-yellow-50 text-yellow-800 text-xs p-2 text-center border-b border-yellow-200 flex items-center justify-center space-x-1">
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>{t('deep_search.mode_active')}</span>
                        </div>
                    )}

                    {/* Messages */}
                    <div
                        ref={messagesContainerRef}
                        className="flex-1 p-4 overflow-y-auto bg-gray-50"
                        style={{ justifyContent: messages.length === 0 ? 'center' : 'flex-end' }}
                    >
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-gray-400 text-sm space-y-2">
                                <div className="bg-white p-4 rounded-full shadow-sm">
                                    <svg className="w-8 h-8 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <p className="text-center max-w-xs">{t('empty.placeholder')}</p>
                                {error && (
                                    <div className="mt-2 p-2 bg-red-50 text-red-500 text-xs rounded max-w-full break-words">
                                        {t('error.prefix')} {error}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`text-sm p-3 pb-4 rounded-xl max-w-[85%] relative ${message.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                                                }`}
                                        >
                                            <div className="whitespace-pre-wrap break-words">{message.text}</div>
                                            <span className={`absolute bottom-[1px] right-2 text-[9px] ${message.sender === 'user' ? 'text-white/80' : 'text-gray-400'} `}>
                                                {formatTime(message.timestamp)}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex justify-start"
                                    >
                                        <div className="text-sm p-3 rounded-xl max-w-[85%] relative bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm flex items-center space-x-2 select-none">
                                            <div className="relative w-5 h-5">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        strokeWidth="4"
                                                        stroke="currentColor"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-600">{typingText}</span>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-2">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    aria-label={t('input.aria_label')}
                                    placeholder={t('input.placeholder')}
                                    className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    disabled={isLoading}
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                                    <button
                                        type="button"
                                        onClick={toggleDeepSearch}
                                        title={deepSearch ? t('deep_search.disable') : t('deep_search.enable')}
                                        className={`p-1.5 rounded-md transition-colors flex items-center ${deepSearch
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-gray-500 hover:bg-gray-100'
                                            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={isLoading}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={deepSearch ? 2 : 1.5}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                        {deepSearch && (
                                            <span className="ml-1 text-xs font-medium">Deep</span>
                                        )}
                                    </button>

                                    <div className="h-5 w-px bg-gray-300"></div>

                                    <button
                                        type="submit"
                                        disabled={isLoading || inputValue.trim() === ''}
                                        className={`p-1 rounded-md transition-colors ${isLoading || inputValue.trim() === ''
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-blue-600 hover:bg-blue-100'
                                            }`}
                                    >
                                        {isLoading ? (
                                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    strokeWidth="4"
                                                    stroke="currentColor"
                                                    fill="none"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* {deepSearch && (
                            <div className="mt-1 text-xs text-blue-600 flex items-center justify-end">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                {t('deep_search.mode_active')}
                            </div>
                        )} */}
                    </form>
                </motion.div>
            )}

            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={t('button.open_chat')}
                    onClick={toggleChat}
                    className="fixed bottom-5 right-5 rounded-full bg-blue-600 w-14 h-14 shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </motion.button>
            )}
        </div>
    );
};

export default AiChatBot;
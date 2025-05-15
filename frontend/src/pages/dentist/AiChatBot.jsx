import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '@/services/other/api';

const agentService = {
    async sendMessage(question, deepSearch = false) {
        try {
            const response = await api.post(
                "/ask",
                { question, deepSearch },
            );
            console.log("API Response:", response);
            return { data: response.data, error: null };
        } catch (error) {
            console.error("API Error:", error);
            return {
                data: null,
                error: error.response?.data?.message || error.message || "Failed to get response"
            };
        }
    }
};

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
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useMessageStorage('aiChatMessages', []);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [deepSearch, setDeepSearch] = useState(false);
    const [error, setError] = useState(null);
    const [typingText, setTypingText] = useState('');
    const messagesEndRef = useRef(null);
    const typingIntervalRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isLoading) {
            const phrases = ["Thinking...", "Analyzing...", "Processing..."];
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
    }, [isLoading]);

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
                text: data?.answer?.answer || "I couldn't process that request.",
                sender: 'bot',
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            setError(err.message);
            const errorMessage = {
                text: "Sorry, I'm having trouble connecting. Please try again later.",
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
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="w-96 h-[32rem] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-white animate-pulse' : 'bg-green-300'}`}></div>
                            <h3 className="font-medium text-sm">AI Assistant</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={clearChat}
                                className="text-white hover:text-gray-200 text-xs p-1 focus:outline-none transition-colors"
                                title="Clear chat"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                            <button
                                onClick={toggleChat}
                                className="text-white hover:text-gray-200 text-lg focus:outline-none transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Deep search indicator */}
                    {deepSearch && (
                        <div className="bg-yellow-50 text-yellow-800 text-xs p-1.5 text-center border-b border-yellow-200 flex items-center justify-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Deep Search Mode - More thorough but slower
                        </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                                <svg className="w-8 h-8 mb-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p>How can I help you today?</p>
                                {error && (
                                    <div className="mt-2 text-red-500 text-xs max-w-full break-words">
                                        Error: {error}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`text-sm p-3 rounded-xl max-w-[85%] relative ${message.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-xs'
                                                }`}
                                        >
                                            {message.text}
                                            <div className={`text-xs opacity-70 mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                                {formatTime(message.timestamp)}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="text-sm p-3 rounded-xl bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-xs max-w-[85%]">
                                            <div className="flex items-center">
                                                <div className="typing-indicator">
                                                    <span className="dot"></span>
                                                    <span className="dot"></span>
                                                    <span className="dot"></span>
                                                </div>
                                                <span className="ml-2 text-gray-500">{typingText}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-2 mb-2">
                            <button
                                type="button"
                                onClick={toggleDeepSearch}
                                className={`flex items-center text-xs px-3 py-1.5 rounded-full transition-colors ${deepSearch
                                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'}`}
                            >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Deep Search
                            </button>
                            <span className="text-xs text-gray-400">
                                {deepSearch ? "Slower but more thorough" : "Faster response"}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isLoading}
                                aria-label="Type your message"
                            />
                            <button
                                type="submit"
                                className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300"
                                disabled={isLoading || !inputValue.trim()}
                                aria-label="Send message"
                            >
                                {isLoading ? (
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Chat icon */}
            <motion.button
                onClick={toggleChat}
                className={`${isOpen ? "hidden" : ""} w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-600 focus:outline-none cursor-grab active:cursor-grabbing`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                drag
                dragConstraints={{
                    top: 0,
                    left: 0,
                    right: window.innerWidth - 48,
                    bottom: window.innerHeight - 48
                }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.1 }}
                aria-label="Open chat"
            >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
                </svg>
                {messages.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {messages.length}
                    </span>
                )}
            </motion.button>

            <style jsx>{`
                .typing-indicator {
                    display: flex;
                    align-items: center;
                    height: 17px;
                }
                .typing-indicator .dot {
                    width: 6px;
                    height: 6px;
                    margin: 0 2px;
                    background-color: #6b7280;
                    border-radius: 50%;
                    display: inline-block;
                    animation: typingAnimation 1.4s infinite ease-in-out;
                }
                .typing-indicator .dot:nth-child(1) {
                    animation-delay: 0s;
                }
                .typing-indicator .dot:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .typing-indicator .dot:nth-child(3) {
                    animation-delay: 0.4s;
                }
                @keyframes typingAnimation {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-5px); }
                }
            `}</style>
        </div>
    );
};

export default AiChatBot;
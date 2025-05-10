import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/services/other/api';

const agentService = {
    async sendMessage(question) {
        try {
            const response = await api.post(
                "/ask",
                { question },
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

const AiChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isLoading) return;

        // Add user message
        const userMessage = { text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // Get bot response
            const { data, error } = await agentService.sendMessage(inputValue);

            if (error) {
                throw new Error(error);
            }

            const botMessage = {
                text: data?.answer?.answer,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                text: "Sorry, I'm having trouble connecting. Please try again later.",
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="w-80 h-[28rem] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <h3 className="font-medium text-sm">AI Assistant</h3>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="text-white hover:text-gray-200 text-lg focus:outline-none transition-colors"
                        >
                            ×
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                                <svg className="w-8 h-8 mb-2 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p>How can I help you today?</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`text-sm p-2.5 rounded-xl max-w-[80%] ${message.sender === 'user'
                                                ? 'bg-blue-600 text-white rounded-br-none'
                                                : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-xs'
                                                }`}
                                        >
                                            {message.text}
                                            {index === messages.length - 1 && message.sender === 'bot' && isLoading && (
                                                <span className="ml-1 inline-block">
                                                    <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mx-0.5"></span>
                                                    <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mx-0.5 delay-75"></span>
                                                    <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mx-0.5 delay-150"></span>
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300"
                                disabled={isLoading || !inputValue.trim()}
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
            >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
                </svg>
            </motion.button>
        </div>
    );
};

export default AiChatBot;
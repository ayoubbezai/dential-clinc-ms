import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AiChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });


    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        // Add user message
        setMessages([...messages, { text: inputValue, sender: 'user' }]);

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "I'm a chatbot. How can I help you?", sender: 'bot' }]);
        }, 500);

        setInputValue('');
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen && (
                <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
                        <h3 className="font-semibold">Chat with us</h3>
                        <button
                            onClick={toggleChat}
                            className="text-white hover:text-gray-200 text-2xl focus:outline-none"
                        >
                            ×
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.length === 0 ? (
                            <div className="text-gray-500 text-center py-8">Hello! How can I help you today?</div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-3 p-3 rounded-lg max-w-xs ${message.sender === 'user'
                                        ? 'bg-blue-500 text-white ml-auto'
                                        : 'bg-gray-100 text-gray-800 mr-auto'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            ))
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}

            {/* Draggable Chat icon */}
            <motion.button
                onClick={toggleChat}
                className={`${isOpen && "hidden"} w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 transition-colors focus:outline-none cursor-grab active:cursor-grabbing`}
                drag
                dragConstraints={{
                    top: 0,
                    left: 0,
                    right: window.innerWidth - 56,
                    bottom: window.innerHeight - 56
                }}
                dragElastic={0.1}
                whileDrag={{ scale: 1.1 }}
            >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
                </svg>
            </motion.button>
        </div>
    );
};

export default AiChatBot;
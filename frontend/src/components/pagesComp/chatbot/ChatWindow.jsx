// ChatWindow.tsx
import { motion } from 'framer-motion';

export default function ChatWindow({
    isLoading, t, clearChat, toggleChat, deepSearch,
    messages, error, typingText, formatTime,
    messagesContainerRef, messagesEndRef,
    handleSendMessage, inputValue, setInputValue,
    toggleDeepSearch
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="w-96 h-[32rem] bg-white rounded-xl shadow-xl flex flex-col border border-gray-200 "
        >
            {/* ... Your full modal UI here exactly as before ... */}
        </motion.div>
    );
}

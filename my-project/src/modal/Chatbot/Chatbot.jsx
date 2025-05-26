import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X, MessageCircle, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
import { getResponseChatbot } from '../../redux/apiRequest';

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { role: 'bot', content: 'Xin chào! Tôi có thể giúp gì cho bạn?', timestamp: new Date() },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (isChatOpen) {
            scrollToBottom();
            setUnreadCount(0);
        } else if (messages.length > 0 && messages[messages.length - 1].role === 'bot') {
            setUnreadCount((prev) => prev + 1);
        }
    }, [messages, isChatOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        const trimmed = inputValue.trim();
        if (trimmed === '') return;

        // Add user message
        const userMessage = {
            role: 'user',
            content: trimmed,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');

        // Simulate bot thinking
        setIsTyping(true);

        try {
            const botReply = await getResponseChatbot(trimmed);
            const botMessage = {
                role: 'bot',
                content: botReply,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'bot',
                    content: 'Xin lỗi, tôi không thể trả lời ngay lúc này.',
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

   

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const clearChat = () => {
        setMessages([
            { role: 'bot', content: 'Lịch sử chat đã được xóa. Tôi có thể giúp gì cho bạn?', timestamp: new Date() },
        ]);
    };

    // Focus on input when chat is opened
    useEffect(() => {
        if (isChatOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isChatOpen]);

    return (
        <div className="fixed bottom-16 right-6 flex flex-col items-end z-50">
            {/* Chat button */}
            {!isChatOpen && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg p-4 hover:shadow-xl transition-all duration-300 flex items-center"
                >
                    <MessageCircle size={24} />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </button>
            )}

            {/* Chat popup */}
            {isChatOpen && (
                <div className="flex flex-col bg-white rounded-lg shadow-2xl w-80 sm:w-96 h-[500px] sm:h-128 overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex justify-between items-center">
                        <div className="flex items-center">
                            <Bot className="mr-2" size={20} />
                            <h2 className="font-semibold">Chuyên viên tư vấn</h2>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={clearChat}
                                className="p-1 rounded-full hover:bg-blue-600 transition"
                                title="Xóa lịch sử chat"
                            >
                                <Trash size={16} />
                            </button>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="p-1 rounded-full hover:bg-blue-600 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs rounded-lg p-3 ${
                                        message.role === 'user'
                                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-none shadow-md'
                                            : 'bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-100'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    <div
                                        className={`text-xs mt-1 ${
                                            message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                                        }`}
                                    >
                                        {formatTime(message.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-800 rounded-lg rounded-bl-none p-3 shadow-md border border-gray-100 flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: '0.2s' }}
                                    ></div>
                                    <div
                                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style={{ animationDelay: '0.4s' }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleInputKeyPress}
                                placeholder="Nhập tin nhắn của bạn..."
                                className="flex-1 bg-transparent border-none focus:outline-none py-2 px-1 text-sm"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={inputValue.trim() === ''}
                                className={`p-2 rounded-full ${
                                    inputValue.trim() === ''
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-blue-500 hover:bg-blue-100'
                                } transition-colors`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add styles for animation */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

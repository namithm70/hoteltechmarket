import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIMatchmaker = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: "Hi! I'm your AI Matchmaker. Tell me what kind of software or hardware you're looking for (e.g., 'I need a PMS for a small hotel')."
        }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Add user message
        const userMsg = { sender: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        const currentQuery = query;
        setQuery('');
        setLoading(true);

        try {
            const { data } = await axios.post('/api/ai/recommend', { query: currentQuery });

            // Add bot response
            const botMsg = {
                sender: 'bot',
                text: data.message,
                products: data.recommendations
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, I'm having trouble connecting to my brain right now. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-50 flex items-center gap-2 group animate-bounce-slow"
            >
                <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
                <span className="font-bold">AI Matchmaker</span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col h-[500px] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold">AI Matchmaker</h3>
                        <p className="text-xs text-purple-100">Powered by HotelTech AI</p>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition">
                    <X size={18} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.sender === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                                }`}
                        >
                            <p className="whitespace-pre-wrap">{msg.text}</p>

                            {/* Product Recommendations */}
                            {msg.products && msg.products.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {msg.products.map(product => (
                                        <Link
                                            key={product._id}
                                            to={`/product/${product._id}`}
                                            className="block bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-lg p-2 transition flex items-center gap-3 group"
                                        >
                                            <div className="w-10 h-10 bg-white rounded border flex-shrink-0 overflow-hidden">
                                                <img src={product.images[0] || 'https://via.placeholder.com/40'} alt={product.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-gray-900 truncate group-hover:text-indigo-600">{product.title}</p>
                                                <p className="text-xs text-green-600 font-medium">${product.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type your requirements..."
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm"
                    />
                    <button
                        type="submit"
                        disabled={!query.trim() || loading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AIMatchmaker;

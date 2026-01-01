
import React, { useState, useRef, useEffect, useContext } from 'react';
import { createNexusChat } from '../services/geminiService';
import { DataContext } from '../context/DataContext';

const GlobalChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
        { role: 'bot', text: 'Nexus initialized. How can I assist your oversight today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const context = useContext(DataContext);

    useEffect(() => {
        if (!chatRef.current) {
            chatRef.current = createNexusChat();
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsTyping(true);

        try {
            const contextStr = ` User: ${context?.userData.name}, Balance: ${context?.userData.balance}.`;
            const result = await chatRef.current.sendMessage({ message: userMsg + contextStr });
            setMessages(prev => [...prev, { role: 'bot', text: result.text || "No response." }]);
        } catch (e) {
            setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to neural link." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {isOpen ? (
                <div className="w-80 h-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-float">
                    <div className="p-4 bg-cyan-600 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            <span className="font-bold text-white text-sm">NEXUS CORE</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-sm">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`
                                    max-w-[85%] p-3 rounded-2xl 
                                    ${m.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'}
                                `}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-700 flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a command..."
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                        />
                        <button onClick={handleSend} className="p-2 bg-cyan-600 rounded-xl hover:bg-cyan-500 transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center hover:scale-110 transition-transform animate-float"
                >
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default GlobalChatbot;


import React, { useState, useContext } from 'react';
import { View } from '../../types';
import { DataContext } from '../../context/DataContext';
import { getGeminiResponse } from '../../services/geminiService';

interface AIAdvisorViewProps {
    previousView: View | null;
}

const AIAdvisorView: React.FC<AIAdvisorViewProps> = ({ previousView }) => {
    const context = useContext(DataContext);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);

    const handleConsult = async () => {
        if (!query.trim()) return;
        setIsThinking(true);
        setResponse(null);

        const fullPrompt = `
            Current User: ${context?.userData.name}
            Liquidity: NX ${context?.userData.balance}
            Recent View: ${previousView}
            User Query: ${query}
            ---
            Provide a strategic recommendation for this director.
        `;

        const text = await getGeminiResponse(fullPrompt);
        setResponse(text || "No insights found in the data stream.");
        setIsThinking(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <header className="text-center space-y-4">
                <div className="inline-block w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full p-0.5 animate-float shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-4xl">
                        👁️
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-white">Quantum Advisor</h1>
                <p className="text-slate-400">Direct neural interface with the Gemini-3 Prediction Engine.</p>
            </header>

            <div className="glass-panel rounded-3xl p-1 relative overflow-hidden">
                <div className="bg-slate-900/50 p-6 rounded-[22px] space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Input Strategy Query</label>
                        <textarea 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., Should I reallocate Stellar Credits to the Bio-Mesh sector given recent hyperinflation trends?"
                            className="w-full bg-slate-950/80 border border-slate-700 rounded-2xl p-4 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all min-h-[120px] resize-none"
                        />
                    </div>
                    
                    <button 
                        onClick={handleConsult}
                        disabled={isThinking}
                        className={`
                            w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2
                            ${isThinking 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                : 'bg-cyan-600 text-white hover:bg-cyan-500 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_20px_rgba(6,182,212,0.3)]'}
                        `}
                    >
                        {isThinking ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                Synthesizing Reality...
                            </>
                        ) : (
                            <>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Consult Nexus Engine
                            </>
                        )}
                    </button>
                </div>
            </div>

            {response && (
                <div className="glass-panel rounded-3xl p-8 border-l-4 border-l-cyan-500 animate-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 font-bold">A</div>
                        <h3 className="text-xl font-bold text-white">Advisor Insights</h3>
                    </div>
                    <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
                        {response.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-xs text-slate-500 italic">Confidence Level: 92.4% based on current multiverse state.</span>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAdvisorView;

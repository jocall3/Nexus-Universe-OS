
import React from 'react';
import { View } from '../types';

interface SidebarProps {
    activeView: View;
    setActiveView: (view: View) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
    const categories = [
        {
            name: "Platform core",
            items: [
                { id: View.MetaDashboard, label: "Meta Dashboard", icon: "🌐" },
                { id: View.Orchestration, label: "Orchestration", icon: "⚙️" },
                { id: View.AgentMarketplace, label: "Agent Marketplace", icon: "🤖" },
            ]
        },
        {
            name: "Financial systems",
            items: [
                { id: View.Dashboard, label: "Personal Dashboard", icon: "📊" },
                { id: View.Investments, label: "Wealth Manager", icon: "💎" },
                { id: View.EconomicSynthesisEngine, label: "Econ Synthesis", icon: "🧬" },
            ]
        },
        {
            name: "Universe & Quantum",
            items: [
                { id: View.GalacticExchange, label: "Galactic Exchange", icon: "✨" },
                { id: View.QuantumEntanglementNetwork, label: "Quantum Network", icon: "⚛️" },
                { id: View.RealityDistortionField, label: "Reality Control", icon: "🌀" },
            ]
        }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed top-0 left-0 bottom-0 w-64 bg-slate-900/80 backdrop-blur-md border-r border-slate-800 z-50 
                transition-transform duration-300 lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        Ω
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Nexus OS
                    </span>
                </div>

                <nav className="p-4 space-y-8 overflow-y-auto h-[calc(100%-80px)] custom-scrollbar">
                    {categories.map(cat => (
                        <div key={cat.name}>
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 px-2">
                                {cat.name}
                            </h3>
                            <ul className="space-y-1">
                                {cat.items.map(item => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveView(item.id)}
                                            className={`
                                                w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                                                ${activeView === item.id 
                                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
                                            `}
                                        >
                                            <span className="text-lg">{item.icon}</span>
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;

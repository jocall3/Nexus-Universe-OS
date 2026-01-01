
import React, { useContext } from 'react';
import { View } from '../../types';
import { DataContext } from '../../context/DataContext';

interface MetaDashboardViewProps {
    setActiveView: (view: View) => void;
}

const MetaDashboardView: React.FC<MetaDashboardViewProps> = ({ setActiveView }) => {
    const context = useContext(DataContext);
    const balance = context?.userData.balance.toLocaleString() || "0";

    const modules = [
        { id: View.Orchestration, title: "Quantum Orchestrator", status: "Active", load: "12%", color: "cyan" },
        { id: View.AIGovernance, title: "Constitutional AI", status: "Balanced", load: "45%", color: "purple" },
        { id: View.DataMesh, title: "Universal Data Mesh", status: "Streaming", load: "89%", color: "blue" },
        { id: View.CiCd, title: "Temporal CI/CD", status: "Standby", load: "0%", color: "emerald" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Meta Dashboard</h1>
                    <p className="text-slate-400 mt-2">Overseeing {context?.userData.name}'s multi-dimensional assets.</p>
                </div>
                <div className="flex gap-2">
                    {['cosmic', 'nexus', 'matrix', 'none'].map(ill => (
                        <button 
                            key={ill}
                            onClick={() => context?.setActiveIllusion(ill)}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                                context?.activeIllusion === ill 
                                ? 'bg-cyan-500 border-cyan-400 text-slate-900' 
                                : 'bg-slate-900 border-slate-700 text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            {ill}
                        </button>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-cyan-500/20 transition-all"></div>
                    <div className="relative z-10">
                        <div className="text-slate-400 text-sm font-semibold tracking-widest uppercase mb-1">Total System Liquidity</div>
                        <div className="text-5xl font-black text-white flex items-baseline gap-2">
                            <span className="text-3xl text-cyan-400">NX</span>
                            {balance}
                        </div>
                        <div className="mt-8 flex gap-4">
                            <button 
                                onClick={() => setActiveView(View.SendMoney)}
                                className="px-6 py-2.5 bg-cyan-500 text-slate-900 font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            >
                                Dispatch Capital
                            </button>
                            <button className="px-6 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-all border border-slate-700">
                                View Treasury
                            </button>
                        </div>
                    </div>
                </div>

                <div className="glass-panel rounded-3xl p-8 border-l-4 border-l-cyan-500">
                    <h3 className="text-white font-bold mb-4">Core Telemetry</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Neural Connectivity</span>
                            <span className="text-cyan-400 font-mono">99.98%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1">
                            <div className="bg-cyan-500 h-1 rounded-full w-[99%]"></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Reality Stability</span>
                            <span className="text-emerald-400 font-mono">Optimal</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Active Agents</span>
                            <span className="text-white font-mono">1,402</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {modules.map(mod => (
                    <button 
                        key={mod.id}
                        onClick={() => setActiveView(mod.id)}
                        className="glass-panel rounded-2xl p-6 text-left hover:border-cyan-500/50 hover:bg-slate-800/40 transition-all group"
                    >
                        <div className={`text-xs font-bold uppercase tracking-widest text-${mod.color}-400 mb-2 flex justify-between items-center`}>
                            {mod.status}
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </div>
                        <div className="text-lg font-bold text-white mb-4 leading-tight">{mod.title}</div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full bg-${mod.color}-500 transition-all duration-1000`} 
                                    style={{ width: mod.load }}
                                />
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{mod.load}</span>
                        </div>
                    </button>
                ))}
            </div>

            <section className="glass-panel rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">System Logs</h2>
                    <button 
                        onClick={() => setActiveView(View.Transactions)}
                        className="text-cyan-400 text-sm font-bold hover:underline"
                    >
                        Detailed Audit Trail
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-slate-800">
                                <th className="pb-4 font-semibold">Entity</th>
                                <th className="pb-4 font-semibold">Classification</th>
                                <th className="pb-4 font-semibold">Value</th>
                                <th className="pb-4 font-semibold">Temporal Stamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {context?.transactions.slice(0, 5).map(tx => (
                                <tr key={tx.id} className="group">
                                    <td className="py-4 font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">{tx.description}</td>
                                    <td className="py-4">
                                        <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[10px] font-bold uppercase">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className={`py-4 font-mono font-bold ${tx.amount < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {tx.amount.toLocaleString()} <span className="text-[10px]">NX</span>
                                    </td>
                                    <td className="py-4 text-slate-500 text-sm">
                                        {new Date(tx.date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default MetaDashboardView;

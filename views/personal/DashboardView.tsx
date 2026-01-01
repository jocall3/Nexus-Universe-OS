
import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { View } from '../../types';

interface DashboardViewProps {
    setActiveView: (view: View) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ setActiveView }) => {
    const context = useContext(DataContext);
    const user = context?.userData;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Personal Overview</h1>
                <p className="text-slate-400 mt-1">Acct: {user?.accountNumber}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Available Balance</div>
                    <div className="text-4xl font-bold text-white mb-6">
                        NX {user?.balance.toLocaleString()}
                    </div>
                    <div className="flex gap-3">
                        <button className="flex-1 py-2 bg-slate-100 text-slate-900 font-bold rounded-xl text-sm hover:bg-white transition-colors">Deposit</button>
                        <button className="flex-1 py-2 bg-slate-800 text-white font-bold rounded-xl text-sm border border-slate-700 hover:bg-slate-700 transition-colors">Transfer</button>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between">
                    <div>
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Nexus Credit Score</div>
                        <div className="text-4xl font-bold text-cyan-400">842</div>
                    </div>
                    <div className="text-xs text-slate-500 mt-4">Top 2% of Galactic Citizens. Tier 1 Access Unlocked.</div>
                </div>

                <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-purple-500/10 transition-all"></div>
                    <div className="relative z-10">
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Active Investments</div>
                        <div className="text-3xl font-bold text-white">14 Nodes</div>
                        <div className="mt-4 text-emerald-400 font-bold text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            +12.4% vs Last Cycle
                        </div>
                    </div>
                </div>
            </div>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                    <button onClick={() => setActiveView(View.Transactions)} className="text-cyan-400 text-sm font-bold">Full History</button>
                </div>

                <div className="space-y-2">
                    {context?.transactions.slice(0, 8).map(tx => (
                        <div key={tx.id} className="glass-panel p-4 rounded-2xl flex items-center justify-between hover:bg-slate-900/40 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                                    {tx.description.includes('API') ? '🤖' : tx.description.includes('Node') ? '⚛️' : '🏦'}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-200">{tx.description}</div>
                                    <div className="text-xs text-slate-500">{tx.category} • {new Date(tx.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div className={`font-mono font-bold ${tx.amount < 0 ? 'text-slate-300' : 'text-emerald-400'}`}>
                                {tx.amount < 0 ? '-' : '+'} NX {Math.abs(tx.amount).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default DashboardView;

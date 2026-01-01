
import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { View } from '../types';

interface HeaderProps {
    onMenuClick: () => void;
    setActiveView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, setActiveView }) => {
    const context = useContext(DataContext);
    const user = context?.userData;

    return (
        <header className="h-20 border-b border-slate-800 bg-slate-900/40 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onMenuClick}
                    className="p-2 lg:hidden text-slate-400 hover:text-white"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                
                <div className="relative group hidden sm:block">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search the universe..." 
                        className="bg-slate-950/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 w-64 focus:w-80 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                    <span className="text-xs text-slate-500 font-medium">SYSTEM STATUS</span>
                    <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                        SYNCHRONIZED
                    </span>
                </div>

                <div className="h-10 w-px bg-slate-800 hidden sm:block"></div>

                <button 
                    onClick={() => setActiveView(View.Settings)}
                    className="flex items-center gap-3 hover:bg-slate-800/40 p-1.5 rounded-full transition-colors group"
                >
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{user?.name}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-tighter">Director Lvl 10</div>
                    </div>
                    <img 
                        src={user?.avatar} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full border-2 border-slate-800 group-hover:border-cyan-500/50 transition-all"
                    />
                </button>
            </div>
        </header>
    );
};

export default Header;

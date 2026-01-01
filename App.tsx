
import React, { useState, useContext } from 'react';
import { View } from './types';
import { DataContext } from './context/DataContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FeatureGuard from './components/FeatureGuard';
import GlobalChatbot from './components/GlobalChatbot';
import MetaDashboardView from './views/platform/MetaDashboardView';
import AIAdvisorView from './views/platform/AIAdvisorView';
import DashboardView from './views/personal/DashboardView';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>(View.MetaDashboard);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [previousView, setPreviousView] = useState<View | null>(null);
    const context = useContext(DataContext);

    if (!context) throw new Error("App must be used within DataProvider");

    const { customBackgroundUrl, activeIllusion, isLoading, error } = context;

    const handleSetView = (view: View) => {
        if (view !== activeView) {
            setPreviousView(activeView);
            setActiveView(view);
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            }
        }
    };

    const renderView = () => {
        if (isLoading && context.transactions.length === 0) {
            return (
                <div className="flex items-center justify-center h-[70vh]">
                    <div className="w-16 h-16 border-4 border-cyan-400 border-dashed rounded-full animate-spin"></div>
                </div>
            );
        }

        switch (activeView) {
            case View.MetaDashboard: return <MetaDashboardView setActiveView={handleSetView} />;
            case View.Dashboard: return <FeatureGuard view={View.Dashboard}><DashboardView setActiveView={handleSetView} /></FeatureGuard>;
            case View.AIAdvisor: return <FeatureGuard view={View.AIAdvisor}><AIAdvisorView previousView={previousView} /></FeatureGuard>;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                        <div className="text-6xl mb-4">🔮</div>
                        <h2 className="text-2xl font-bold text-cyan-400">View Not Fully Initialized</h2>
                        <p className="text-slate-400 mt-2">The module "{activeView}" is currently being synced from the Quantum Core.</p>
                        <button 
                            onClick={() => handleSetView(View.MetaDashboard)}
                            className="mt-6 px-6 py-2 bg-cyan-900/50 border border-cyan-500 rounded-lg hover:bg-cyan-800 transition-colors"
                        >
                            Return to Meta Dashboard
                        </button>
                    </div>
                );
        }
    };

    const backgroundStyle = {
        backgroundImage: customBackgroundUrl ? `url(${customBackgroundUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    };

    const IllusionLayer = () => {
        if (!activeIllusion || activeIllusion === 'none') return null;
        
        // Simple procedural background effects
        const gradients = {
            cosmic: 'radial-gradient(circle at 50% 50%, rgba(30, 0, 80, 0.4) 0%, transparent 70%)',
            nexus: 'radial-gradient(circle at 20% 30%, rgba(0, 50, 50, 0.3) 0%, transparent 60%)',
            matrix: 'linear-gradient(rgba(0, 20, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 20, 0, 0.2) 1px, transparent 1px)'
        };

        const currentStyle = gradients[activeIllusion as keyof typeof gradients] || gradients.cosmic;

        return (
            <div 
                className="fixed inset-0 z-0 pointer-events-none opacity-50"
                style={{ 
                    backgroundImage: currentStyle,
                    backgroundSize: activeIllusion === 'matrix' ? '30px 30px' : 'auto'
                }}
            />
        );
    };

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-300 font-sans overflow-hidden" style={backgroundStyle}>
            <IllusionLayer />
            
            <div className="relative z-10 flex min-h-screen">
                <Sidebar 
                    activeView={activeView} 
                    setActiveView={handleSetView} 
                    isOpen={isSidebarOpen} 
                    setIsOpen={setIsSidebarOpen} 
                />
                
                <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">
                    <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} setActiveView={handleSetView} />
                    
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
                        <div className="max-w-7xl mx-auto">
                            {renderView()}
                        </div>
                    </main>
                </div>

                <GlobalChatbot />
            </div>
        </div>
    );
};

export default App;


import React from 'react';
import { View } from '../types';

interface FeatureGuardProps {
    view: View;
    children: React.ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({ view, children }) => {
    // In a real app, check permissions/tiers here
    const isRestricted = false; 

    if (isRestricted) {
        return (
            <div className="p-8 border border-amber-900/50 bg-amber-950/20 rounded-2xl text-center">
                <div className="text-4xl mb-4">🔐</div>
                <h2 className="text-xl font-bold text-amber-400">Restricted Access</h2>
                <p className="text-slate-400 mt-2">The module "{view}" requires Tier 2 Clearance.</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default FeatureGuard;

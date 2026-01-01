
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, UserData } from '../types';

interface DataContextType {
    userData: UserData;
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;
    customBackgroundUrl: string | null;
    activeIllusion: string;
    setCustomBackgroundUrl: (url: string | null) => void;
    setActiveIllusion: (illusion: string) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData] = useState<UserData>({
        name: "Director Prime",
        balance: 1420560.85,
        accountNumber: "NX-882-100-29",
        avatar: "https://picsum.photos/seed/nexus/200/200"
    });

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error] = useState<string | null>(null);
    const [customBackgroundUrl, setCustomBackgroundUrl] = useState<string | null>(null);
    const [activeIllusion, setActiveIllusion] = useState<string>('cosmic');

    useEffect(() => {
        // Mock data generation
        const mockTransactions: Transaction[] = Array.from({ length: 20 }).map((_, i) => ({
            id: `tx-${i}`,
            date: new Date(Date.now() - i * 86400000).toISOString(),
            description: ["Quantum Node Subscription", "Hyperloop Toll", "Stellar Credit Exchange", "AI API Usage", "Reality Patch Payment"][i % 5],
            amount: -Math.floor(Math.random() * 1000) - 50,
            category: ["Utilities", "Transport", "Investment", "Platform", "Infrastructure"][i % 5],
            status: 'completed'
        }));

        setTimeout(() => {
            setTransactions(mockTransactions);
            setIsLoading(false);
        }, 1200);
    }, []);

    return (
        <DataContext.Provider value={{
            userData,
            transactions,
            isLoading,
            error,
            customBackgroundUrl,
            activeIllusion,
            setCustomBackgroundUrl,
            setActiveIllusion
        }}>
            {children}
        </DataContext.Provider>
    );
};

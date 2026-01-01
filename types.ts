
export enum View {
    // Platform
    MetaDashboard = 'meta-dashboard',
    AgentMarketplace = 'agent-marketplace',
    Orchestration = 'orchestration',
    DataMesh = 'data-mesh',
    DataCommons = 'data-commons',
    Mainframe = 'mainframe',
    AIGovernance = 'ai-governance',
    AIRiskRegistry = 'ai-risk-registry',
    OSPO = 'ospo',
    CiCd = 'cicd',
    Inventions = 'inventions',
    Roadmap = 'roadmap',
    Connect = 'connect',
    EconomicSynthesisEngine = 'economic-synthesis',

    // Personal
    Dashboard = 'personal-dashboard',
    Transactions = 'transactions',
    SendMoney = 'send-money',
    Budgets = 'budgets',
    Investments = 'investments',
    PortfolioExplorer = 'portfolio-explorer',
    Crypto = 'crypto',
    FinancialGoals = 'financial-goals',
    Marketplace = 'marketplace',
    Personalization = 'personalization',
    CardCustomization = 'card-customization',
    RewardsHub = 'rewards-hub',
    CreditHealth = 'credit-health',
    Security = 'security',
    OpenBanking = 'open-banking',
    Settings = 'settings',

    // Universe/Quantum
    GalacticExchange = 'galactic-exchange',
    StellarResourceManagement = 'stellar-resources',
    QuantumEntanglementNetwork = 'quantum-network',
    MultiverseSimulationMatrix = 'multiverse-matrix',
    RealityDistortionField = 'reality-distortion',

    // AI
    AIAdvisor = 'ai-advisor',
    QuantumOracle = 'quantum-oracle',
    TheNexus = 'the-nexus',
    TheWinningVision = 'winning-vision',
    APIStatus = 'api-status',

    // Regulatory
    TheCharter = 'the-charter',
    FractionalReserve = 'fractional-reserve',
    FinancialInstrumentForge = 'instrument-forge'
}

export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    category: string;
    status: 'completed' | 'pending' | 'failed';
}

export interface UserData {
    name: string;
    balance: number;
    accountNumber: string;
    avatar: string;
}

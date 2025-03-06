import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ErrorContextType {
    error: string | null;
    showError: (message: string) => void;
}

interface ErrorProviderProps {
    children: ReactNode;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    const showError = (message: string): void => {
        setError(message);
        setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    };

    return (
        <ErrorContext.Provider value={{ error, showError }}>
            {children}
            {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
        </ErrorContext.Provider>
    );
};

export const useError = (): ErrorContextType => {
    const context = useContext(ErrorContext);
    if (context === undefined) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};

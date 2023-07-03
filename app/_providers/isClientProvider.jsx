'use client'

import {
	createContext, useEffect, useContext, useState
} from 'react';

const ClientContext = createContext(false);

export const ClientProvider = ({ children }) => {
    
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    return <ClientContext.Provider value={isClient}>{children}</ClientContext.Provider>

};

export const useIsClient = () => {
    return useContext(ClientContext);
};
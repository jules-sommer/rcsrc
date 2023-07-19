'use client'

import {
    useEffect
} from 'react';

import { atom, useAtom } from 'jotai';

export const isClientAtom = atom(false);

export const ClientProvider = ({ children }) => {
    
    const [_, setIsClient] = useAtom(isClientAtom);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return children;

};
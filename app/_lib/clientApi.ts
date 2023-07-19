import { atom, useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

export const dataAtom = atom<{
    success: boolean,
    data: any[]
}>({ success: false, data: [] });

export const isLoadingAtom = atom<boolean>(false);

export const useApi = (requests: String[]) => {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [isLoading, setLoading] = useAtom<typeof isLoadingAtom>(isLoadingAtom);

    useEffect(() => {

        setLoading(true);

        

    }, [requests]);

}
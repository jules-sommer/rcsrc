'use client'

import { atom } from "jotai";

const makeQueryClient = async () => {

    const fetchMap = new Map<string, Promise<any>>();

    return function queryClient<QueryResult>(
        name: string,
        query: () => Promise<QueryResult>
    ): Promise<QueryResult> {

        if (!fetchMap.has(name)) {
            fetchMap.set(name, query());
        }

        return fetchMap.get(name)!;

    };
    
}

export const queryClientAtom = atom(makeQueryClient());
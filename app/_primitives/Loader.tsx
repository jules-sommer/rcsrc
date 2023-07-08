'use client'

import { useEffect, useState, useDebugValue } from 'react';

export type LoaderSize = "small" | "default" | "large";

export const Loader = ({ size, text = "Loading" } : { size: LoaderSize, text: string }) => {

    const [ellipsis, setEllipsis] = useState(0);
    
    let textWithEllipsis = text;
    useDebugValue(ellipsis);

    useEffect(() => {

        const interval = setInterval(() => {

            if(ellipsis === 3) setEllipsis(0);
            else setEllipsis(ellipsis + 1);

        }, 300);

        textWithEllipsis = text + ".".repeat(ellipsis);

        return () => clearInterval(interval);

    }, [])

    return (

        <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="loading loading-ring loading-lg"/>
            <span className="opacity-50 animate-pulse my-7">
                {textWithEllipsis}
            </span>
        </div>

    )

}
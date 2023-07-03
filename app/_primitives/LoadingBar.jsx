'use client'

import { useEffect, useRef } from "react";
import LoadingBar from "react-top-loading-bar";

export const LoadingBarWrapper = () => {

    const ref = useRef(null);

    useEffect(() => {

        ref.current.continuousStart();

        return () => {
            if( ref.current )
                ref.current.complete();
        }

    }, [])

    return (

        <LoadingBar color={'#04a5ea'} ref={ref} />

    )

}
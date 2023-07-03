'use client'

import { useContext } from "react";
import { CartStateContext } from "./cartProvider";

const ShowGlobalState = () => {

    const state = useContext(CartStateContext);

    return (

        <div className='fixed bg-white rounded-2xl overflow-scroll z-50 left-8 bottom-8 h-[300px] w-[300px]'>
            <pre className="w-full h-full p-4 whitespace-pre-wrap">{JSON.stringify(state, undefined, 2)}</pre>
        </div>
    
    ); 

}

export default ShowGlobalState;
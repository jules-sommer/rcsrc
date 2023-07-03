

import React from 'react';
import Header from '../../_primitives/header/header'
import Footer from '../../_primitives/footer/footer'
import { LoadingBarWrapper } from '../../_primitives/LoadingBar';

export const MoleculeListSkeleton = (numGridItems = 4) => {

    let gridItems = [];

    const GridItem = ({ key }) => {

        <div key={key}  className="h-64 w-[100%] flex flex-row bg-gradient-to-t from-indigo-200 via-blue-200 to-sky-200 rounded-2xl">
            <div className="w-full h-24 bg-gray-200 rounded-lg"></div>
            <div className="w-full h-4 mt-2 bg-gray-200 rounded-lg"></div>
            <div className="w-full h-4 mt-2 bg-gray-200 rounded-lg"></div>
            <div className="w-full h-4 mt-2 bg-gray-200 rounded-lg"></div>
        </div>

    }

    for (let i = 0; i < numGridItems; i++) {

        gridItems.push(<GridItem key={i} />);

    }

    return (

        <main>

            <div className="grid grid-cols-2 gap-5 w-[100%] px-12 mx-auto h-auto">
                {gridItems}
            </div>

        </main>
            
    )


}

const LoadingPage = () => {

    return (

        <main className='w-full h-full bg-indigo-950'>

            <LoadingBarWrapper />
        
        </main>
        
    )
    

}

export default LoadingPage;
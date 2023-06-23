import Image from 'next/image';

export const MoleculeInfoSkeleton = () => {
    
    return (

        <div className="flex w-[100%] px-12 mx-auto animate-pulse">

            <div className="w-64 h-64 flex-shrink-0 rounded-2xl inline-flex mr-24 items-center bg-indigo-100/30 ring-1 ring-inset ring-indigo-600-700/30">

                <Image 
                    className="!h-auto !w-auto !relative opacity-30"
                    src={'/loading-caffeine.png'}
                    alt={'loading...'}
                    fill
                />

            </div>

            <div className="text-sky-100 flex flex-col font-mono title w-9/12 mx-auto mb-8">

                <h1 className="text-4xl">Loading...</h1>

                <span className="my-5">

                    <h2 className="text-md text-sky-100/20">
                        <b className="text-sky-100/75">CAS#</b>
                        {' '}
                        0000-00-00
                    </h2>
                    <h2 className="text-md text-sky-100/20">
                        <b className="text-sky-100/75">IUPAC:</b>
                        {' '}
                        1,3,7-trimethyl-loading-2,6-howlongcanthistake
                    </h2>
                    <h2 className="text-md text-sky-100/20">
                        <b className="text-sky-100/75">SMILES:</b>
                        {' '}
                        CN1C=NC2=C1C(=O)N(C(=O)N2C)C
                    </h2>

                </span>

                <div className="flex flex-row my-5">
                    
                    <span className="inline-flex mr-2 items-center rounded-md bg-slate-400/50 px-2 py-1 text-xs font-medium text-purple-700/50 ring-1 ring-inset ring-blue-700/30">Tags</span>
                    <span className="inline-flex mr-2 items-center rounded-md bg-slate-400/50 px-2 py-1 text-xs font-medium text-purple-700/50 ring-1 ring-inset ring-blue-700/30">Are</span>
                    <span className="inline-flex mr-2 items-center rounded-md bg-slate-400/50 px-2 py-1 text-xs font-medium text-purple-700/50 ring-1 ring-inset ring-blue-700/30">Just Loading...</span>
                    <span className="inline-flex mr-2 items-center rounded-md bg-slate-400/50 px-2 py-1 text-xs font-medium text-purple-700/50 ring-1 ring-inset ring-blue-700/30">Oh yeah!</span>

                </div>

                <div>

                    <p className="font-sans leading-loose my-5 text-lg text-slate-200/30 font-light">This will soon be a page containing a very exciting molecule, we're just doing some data fetching in the background, take a look at this beautiful Caffeine molecule while we do that and we'll be right back to help you with all your research chemical needs.</p>

                </div>

            </div>

        </div>

    );

}

export default MoleculeInfoSkeleton;
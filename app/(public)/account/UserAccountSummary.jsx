"use client"

import { useUserInfo } from '../../_providers/useUserInfo';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Suspense } from 'react';

const UserAccountSummary = async () => {

    const { data: session, status } = useSession();

    const [
        authState,
        signIn,
        signOut,
    ] = useUserInfo();

    return (

            <div as="main" className='grid grid-cols-5 justify-evenly grid-rows-12 w-9/12 mx-auto py-16 gap-4'>
            
                <div className='flex flex-col w-96 h-min col-span-2 items-center row-auto col-span-1 bg-gradient-to-br from-indigo-950 to-violet-950 border-purple-950 border-2 rounded-2xl shadow-xl shadow-violet-950/50 p-8'>

                    <span className="material-symbols-rounded inline-flex items-center justify-center !text-9xl text-sky-300">
                        account_circle
                    </span>

                    <Suspense fallback={<p>Loading user data...</p>}>

                        <h1 level={3} className='text-sky-100 font-mono leading-loose mb-2'></h1>
                        <h3 level={6} className='text-sky-100/75 font-mono font-extralight leading-loose'></h3>
                        <h3 level={6} className='text-sky-100/75 font-mono font-extralight leading-loose'></h3>

                        <div className='my-6'>
                            {/*user.groups ? user.groups.map((thisRole) => (<Badge variation="info" className='bg-sky-600 text-sky-50' size='large'>{thisRole}</Badge>)) : null*/}
                        </div>

                        <button
                            variation="primary"
                            size="large"
                            className='mt-4 border-sky-600 border-2 hover:bg-sky-600 font-mono font-light bg-sky-600/30'
                            isFullWidth={true}
                        >Edit Profile</button>
                        
                        <button
                            variation="destructive"
                            size="large"
                            className='mt-4 border-red-600 border-2 font-mono font-light bg-red-600/30'
                            isFullWidth={true}
                            onClick={() => {
                                signOut();
                            }}
                        >Sign Out</button>
                        
                    </Suspense>
                    
                </div>

                <div className='col-start-3 col-span-3 row-auto w-full h-min p-8 bg-sky-50 rounded-2xl'>

                    <div className="tabs tabs-boxed">
                        <a className="tab">Tab 1</a> 
                        <a className="tab tab-active">Tab 2</a> 
                        <a className="tab">Tab 3</a>
                    </div>
                        
                </div>

            </div>    

    )

}

export default UserAccountSummary;
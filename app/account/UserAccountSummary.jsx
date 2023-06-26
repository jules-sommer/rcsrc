"use client"

import { Authenticator, Badge, Button, TabItem, Tabs, View } from '@aws-amplify/ui-react';
import { Heading } from '@aws-amplify/ui-react';
import useUserInfo from '../_providers/useUserInfo';

import {
    ProfileCard 
} from '../ui-components';
import { Tab } from '@headlessui/react';

const UserAccountSummary = () => {

    const [authedUser, setAuthedUser, signOut] = useUserInfo();

    console.log(authedUser)

    if (!authedUser.isAuthenticated) {

        return (

            <View className="flex items-center justify-center h-full w-full py-24">

                <Authenticator
                    className='w-auto bg-gradient-to-br from-sky-900 to-sky-800 rounded-md shadow-lg p-8'
                    loginMechanisms={['username', 'phone_number', 'email']}
                    socialProviders={['google']}
                />

            </View>

        );

    }

    return (

        <>

            <View as="main" className='grid grid-cols-5 justify-evenly grid-rows-12 w-9/12 mx-auto py-16 gap-4'>
            

                <div className='flex flex-col w-96 h-min col-span-2 items-center row-auto col-span-1 bg-gradient-to-br from-indigo-950 to-violet-950 border-purple-950 border-2 rounded-2xl shadow-xl shadow-violet-950/50 p-8'>

                    <span className="material-symbols-rounded inline-flex items-center justify-center !text-9xl text-sky-300">
                        account_circle
                    </span>

                    <Heading level={3} className='text-sky-100 font-mono leading-loose mb-2'>{authedUser.name}</Heading>
                    <Heading level={6} className='text-sky-100/75 font-mono font-extralight leading-loose'>{authedUser.email}</Heading>
                    <Heading level={6} className='text-sky-100/75 font-mono font-extralight leading-loose'>{authedUser.phone_number}</Heading>

                    <div className='my-6'>
                        {authedUser.roles ? authedUser.roles.map((thisRole) => (<Badge variation="info" className='bg-sky-600 text-sky-50' size='large'>{thisRole}</Badge>)) : null}
                    </div>

                    <Button
                        variation="primary"
                        size="large"
                        className='mt-4 border-sky-600 border-2 hover:bg-sky-600 font-mono font-light bg-sky-600/30'
                        isFullWidth={true}
                        onClick={() => {
                            setAuthedUser({ isAuthorized: false });
                            signOut();
                        }}
                    >Edit Profile</Button>
                    
                    <Button
                        variation="destructive"
                        size="large"
                        className='mt-4 border-red-600 border-2 font-mono font-light bg-red-600/30'
                        isFullWidth={true}
                        onClick={() => {
                            setAuthedUser({ isAuthorized: false });
                            signOut();
                        }}
                    >Sign Out</Button>
                    
                </div>

                <div className='col-start-3 col-span-3 row-auto w-full h-min p-8 bg-sky-50 rounded-2xl'>

                    <Tabs>

                        <TabItem title={"User Obj (Temp.)"} className='p-6'>

                            <Heading level={3} className='font-mono text-slate-900'>AuthedUser Object AWS:</Heading>
                            <pre className='font-mono text-slate-800 whitespace-pre-wrap font-bold'>{JSON.stringify(authedUser, undefined, 4)}</pre>        
                    
                        </TabItem>

                    </Tabs>
                        
                </div>

            </View>    


        </>

    )

}

export default UserAccountSummary;
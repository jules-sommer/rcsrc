"use client"

import { Authenticator, Badge, View } from '@aws-amplify/ui-react';
import { Heading } from '@aws-amplify/ui-react';
import useUserInfo from '../_providers/useUserInfo';

import {
    ProfileCard 
} from '../ui-components';

const UserAccountSummary = () => {

    const [authedUser, setAuthedUser] = useUserInfo();

    if (!authedUser.isAuthorized) {

        return (

            <View className="flex items-center justify-center h-full w-full py-24">

                <Authenticator />

            </View>

        );

    }

    return (

        <>

            <View className='flex flex-column'>
            
                <div className='flex'>
                
                    <span className="material-symbols-rounded h-24 w-24">
                        account_circle
                    </span>

                    <div>

                        <Heading level={5} className='font-mono text-sky-200 font-light'>Welcome to RCSrc Canada,</Heading>
                        <Heading level={2} className='text-sky-100'>{authedUser.name}</Heading>
                        <Heading level={6} className='font-mono text-sky-200 font-light'>Your role: ${authedUser.roles ? authedUser.roles.forEach(element => <Badge type="info">{element}</Badge>) : null}</Heading>

                    </div>

                </div>            

                <div>

                    <ProfileCard/>
                    
                </div>
                
                <div className='mt-16'>
                    <Heading level={1} className='font-mono text-white'>AuthedUser Object AWS:</Heading>
                    <pre className='font-mono text-white max-w-9/12 whitespace-pre-wrap mx-auto font-bold'>{JSON.stringify(authedUser, undefined, 4)}</pre>        
                </div>

            </View>    


        </>

    )

}

export default UserAccountSummary;
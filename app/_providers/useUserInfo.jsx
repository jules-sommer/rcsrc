'use client'

import { useState, useMemo, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import awsExports from '../aws-exports';
import { Amplify } from 'aws-amplify';

Amplify.configure({ ...awsExports, ssr: true });

const useUserInfo = () => {

    const { route, user, signOut } = useAuthenticator((context) => [context.user])
    const [ authedUser, setAuthedUser ] = useState({});

    useEffect(() => {

        // i.e user is authenticated
        if (route === 'authenticated') {

            setAuthedUser({
                ...user.signInUserSession.idToken.payload,
                roles: user.signInUserSession.idToken.payload["cognito:groups"],
                ['cognito:groups']: _,
                cartStore: JSON.parse(user.pool.storage.store.cartStore),
                isAuthenticated: true
            });

        } else {
            setAuthedUser({ isAuthenticated: false });
        }

        console.log(`authedUser: ${JSON.stringify(authedUser)} (useUserInfo.jsx)`);

    }, [user]);
        
    return [
        authedUser,
        setAuthedUser,
        signOut
    ];
    
}

export default useUserInfo;
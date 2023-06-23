'use client'

import { Amplify } from 'aws-amplify';
import { useMemo, useState, createContext, useEffect } from 'react';

import { Auth } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsmobile from '../aws-exports';

Amplify.configure({ ...awsmobile, ssr: true });

export const UserContext = createContext(null);
export const SignOutContext = createContext(null);

const UserContextProvider = ({ children }) => {

    const { user, signOut } = useAuthenticator((context) => [context.user])
    const [ authedUser, setAuthedUser ] = useState({});
    
    useEffect(() => {

        Auth.currentAuthenticatedUser({
            bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
            .then((thisUser) => {
            
                setAuthedUser({
                    ...thisUser.signInUserSession.idToken.payload,
                    roles: thisUser.signInUserSession.idToken.payload["cognito:groups"],
                    ['cognito:groups']: _,
                    cartStore: JSON.parse(thisUser.pool.storage.store.cartStore),
                    isAuthenticated: true
                });

            })
            .catch((err) => {
            
                setAuthedUser({ isAuthenticated: false });
                console.error(`ERROR: ${err} (useAuthProvider.jsx)`)
            
            });

    }, [user])

    return (

        <UserContext.Provider value={authedUser}>
            <SignOutContext.Provider value={signOut}>
                {children}
            </SignOutContext.Provider>
        </UserContext.Provider>

    )

}

const AuthProvider = ({ children }) => {

    return (

        <Authenticator.Provider>
            {children}
        </Authenticator.Provider>
    
    );
            
};

/*
    return (

        <Authenticator
            loginMechanisms={['username','phone_number','email']}
            socialProviders={['google']}
        >
            {({ signOut, user }) => children}
        </Authenticator>

    );

}
*/
export default AuthProvider;
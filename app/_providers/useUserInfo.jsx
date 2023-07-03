'use client'

import { useState, useMemo, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { mapKeys } from 'lodash';
import { Hub } from '@aws-amplify/core';

export const useUserInfo = () => {

    const { route, user, signOut } = useAuthenticator(context => [context.route, context.user, context.isPending])
    const [authedUser, setAuthedUser] = useState({});
    const [latestAuthEvent, setLatestAuthEvent] = useState(null);

    const router = useRouter();

    Hub.listen('auth', (data) => {
        
        switch (data.payload.event) {
        
            case 'signIn':
        
                router.push('/account').reload();
                
                setLatestAuthEvent({
                    type: 'signIn',
                    event: data.payload.event
                });
                break;
            
            case 'signUp':

                router.push('/account/login')    
                
                setLatestAuthEvent({
                    type: 'signUp',
                    event: data.payload.event
                });
                break;
            
            case 'signOut':

                router.push('/')
                
                setLatestAuthEvent({
                    type: 'signOut',
                    event: data.payload.event
                });
                break;

            case 'signIn_failure':

                setLatestAuthEvent({
                    type: 'signIn_failure',
                    event: data.payload.event
                });
                break;

            case 'configured':
                setLatestAuthEvent({
                    type: 'auth_configured',
                    event: data.payload.event
                });
                break;
            
            default:
                setLatestAuthEvent({
                    type: 'unknown',
                    event: data.payload.event
                });
                break;
                
        }

        console.log(latestAuthEvent);

    });

    useEffect(() => {

        console.log(`route: ${route} ( useUserInfo() )`);

        if (route == 'authenticated') {

            // clean up the user object and add some additional properties
            // including the cartStore object, and the 'isAuthenticated' property

            const newUserObj = {
                ...user.signInUserSession.idToken.payload,
                username: user.signInUserSession.idToken.payload["cognito:username"],
                currentStatus: route,
                //cartStore: JSON.parse(user.pool.storage.store.cartStore),
                storage: { ...user.pool.storage.store }
            }

            // Remove 'cognito:' from the keys using lodash _.mapKeys

            const lessCognitoUserObj = mapKeys(newUserObj, (value, key) => {
                                            if (key.includes('cognito:')) {
                                                return key.replace('cognito:', '');
                                            } else {
                                                return key;
                                            }
                                        });

            setAuthedUser({
                ...lessCognitoUserObj,
                isAuthenticated: true,
                loading: false,
                route: route
            });

        } else if (route == 'idle') {
        
            setAuthedUser({ isAuthenticated: undefined, loading: true, route: route })

        } else {

            setAuthedUser({ isAuthenticated: false, loading: false, route: route });

        }

    }, [user, route, latestAuthEvent]);

    const signUserOut = ( pathname = '/' ) => {

        setAuthedUser({ isAuthenticated: false });
        signOut();
        
        router.push(pathname);

    }
        
    return [
        authedUser,
        route,
        signUserOut,
    ];
    
}
'use client'

import { useState, useMemo, useEffect } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

const useUserInfo = () => {

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
                    ['cognito:groups']: _, // removes awkward key of 'cognito:groups', since we replaced it with 'roles' above
                    isAuthorized: true,
                    //cartStore: JSON.parse(thisUser.pool.storage.store.cartStore),
                });

                console.log(authedUser);

            })
            .catch((err) => {

                console.log(err);

                if (err) {
                    setAuthedUser({ isAuthorized: false, error: err });
                    return [authedUser, setAuthedUser];
                }
                
            });
        
        console.log(authedUser);
            
        }, [user]);
        
    return [
        authedUser,
        setAuthedUser,
        signOut
    ];
    
}

export default useUserInfo;
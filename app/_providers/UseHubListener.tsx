"use client";

import { Hub } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setLatestAuthEvent } from '../_slices/_auth';

export const UseHubListener = ({ children }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    Hub.listen('auth', async (data) => {

        switch (data.payload.event) {

            case 'signIn':

                dispatch(setLatestAuthEvent({
                    type: 'signIn',
                    event: data.payload.event
                }));

                router.push('/account');
                router.refresh();

                break;
            
            case 'signUp':

                router.push('/account/login');
                
                dispatch(setLatestAuthEvent({
                    type: 'signUp',
                    event: data.payload.event
                }));
                break;
            
            case 'signOut':

                router.push('/')
                
                dispatch(setLatestAuthEvent({
                    type: 'signOut',
                    event: data.payload.event
                }));
                break;

            case 'signIn_failure':

                dispatch(setLatestAuthEvent({
                    type: 'signIn_failure',
                    event: data.payload.event
                }));
                break;

            case 'configured':
                dispatch(setLatestAuthEvent({
                    type: 'auth_configured',
                    event: data.payload.event
                }));
                break;
            
            default:
                dispatch(setLatestAuthEvent({
                    type: 'unknown',
                    event: data.payload.event
                }));
                break;
                
        }
            
    });

    return (

        <>{children}</>

    )

}
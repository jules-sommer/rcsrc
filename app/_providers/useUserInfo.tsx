'use client'

import { useRouter } from 'next/navigation';
import { mapKeys } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from "next-auth/react";
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from 'react';

import type { User } from '../_slices/_auth';
import { logUserIn, setLatestAuthEvent, signUserOut } from '../_slices/_auth';

export const useUserInfo = () => {

    const authState = useSelector((state) => state.authReducer.value);
    const { data: session, status } = useSession();

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {

        console.log(`Session: ${JSON.stringify(session)}`)
        console.log(`Status: ${JSON.stringify(status)}`)

        if( session ) {



        }

    }, []);

    const signOut = () => {

        try {

            signOut();
            dispatch(signUserOut);

        } catch (error) {

            console.log(error);

        }
            
    }

    return [
        authState,
        session,
        status,
        signUserOut
    ];

} 
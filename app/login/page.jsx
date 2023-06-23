'use client'

import { useEffect } from "react";

import { Amplify } from 'aws-amplify';

import { Authenticator, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
import router from 'next/router';

Amplify.configure(awsExports);

const Login = () => {

    const { route } = useAuthenticator((context) => [context.route]);
    
    const location = usePathname();
    const navigate = useRouter();

    console.log(`Pathname: ${location} ( /login/page.jsx )`)

    // let from = location.state?.from?.pathname || '/';
    
    useEffect(() => {
    
        console.log(location);
        console.log(route);

        if (route === 'authenticated') {
            navigate.push(from);
        }
    
    }, [route, from]);
    
    return (
        <Authenticator
            loginMechanisms={['username','phone_number','email']}
            socialProviders={['google']}
        >
            {({ signOut, user }) => children}
        </Authenticator>
    );

}

export default Login;
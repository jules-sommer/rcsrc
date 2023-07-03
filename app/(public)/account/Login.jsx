import { Auth, Hub } from 'aws-amplify';
import Image from 'next/image';
import { LoginForm } from './LoginForm';
import Logo from '../../_primitives/Logo';
import Link from 'next/link';
import { Suspense } from 'react';

export const SignUp = () => {

    

}

export const Login = () => {

    let formState;

    Hub.listen('auth', (data) => {

        const event = data.payload.event;
        console.log('Auth Event:', event);

        if (event === "signOut")
            console.log('user signed out...');
        else if (event === "signIn")
            console.log('user has signed in....');
        
    });

    return (
    
        <main>
        
            <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">

                <div className="w-1/3 flex flex-col items-center justify-center">
                    <Logo
                        className={`mx-auto my-5 w-full`}
                        scale={1.25} />
                        
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                        
                    <p className="mt-10 text-center text-sm text-slate-400">Not a member?{' '}
                        <Link href="#" className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">Sign up now to join our community</Link>
                    </p>
                    
                </div>
                
            </div>
            
        </main>
        
    )
    
}
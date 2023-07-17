'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useSearchParams } from 'next/navigation';

import Image from 'next/image';
import githubMark from '/public/github-mark-white.png';
import googleMark from '/public/google-mark.png';

import { signIn } from 'next-auth/react';


import { useRouter } from 'next/navigation';
import { SecondaryBodyText } from '../../../../_primitives/Typography';

import { atom, useAtom } from "jotai";
import { sessionAtom, userEmailAtom } from "../../../../_providers/JotaiProvider";
import { RCStore } from "../../../../_providers/JotaiProvider";

import isEmail from 'validator/lib/isEmail';

import useSWR from 'swr';
import { memo, useEffect } from "react";

const isLoadingAtom = atom(false);
const fetcher = (url) => fetch(url).then((res) => res.json());

let renderCount = 0;

export const LoginForm = ({ serverSession }) => {

    
    // increment render count
    renderCount++;
    
    const [session, setSession] = useAtom(sessionAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    const [userEmail, setUserEmail] = useAtom(userEmailAtom);


    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/account?login=success";
    const verifyRequest = searchParams.get("verifyRequest") || null;
    const provider = searchParams.get("provider") || null;


    if( verifyRequest && provider ) {

        console.log(verifyRequest);
        console.log(provider)
    
    }

    const LoginForm = z.object({
        email: z.string().min(1, { message: 'Email is required.' }),
    });

    type LoginFormSchema = z.infer<typeof LoginForm>;

    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors
        }
    } = useForm<LoginFormSchema>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(LoginForm)
    });
    
    const router = useRouter();

    const submitLoginForm = async (formData) => {

        console.log(formData);

        setIsLoading(true);

        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/read/email`, {
            method: 'POST',
            body: JSON.stringify({
                email: userEmail
            }),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        });

        const { success, message, data: user } = await result.json();

        if( success && user ) {

            setSession({ 
                ...session,
                user: {
                    ...session.user,
                    ...user
                }
            });

            const res = await signIn('email', { 
                email: userEmail, 
                callbackUrl: 'http://localhost:3000/account' 
            });

            setIsLoading(false);

        }

    }

    const buttonClass = `mb-2 flex flex-row justify-between border border-slate-100/75 hover:border-slate-100 text-white font-mono font-light py-3 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600`;

    if( isLoading ) {

        return <div className="w-full h-full flex items-center justify-center"><span className="loading loading-ring loading-lg"></span></div>
    
    } else if( verifyRequest === 'true' && provider === 'magicLink' ) {

        return (
            <div className="flex flex-col prose text-white text-center p-8 border-2 rounded-lg border-indigo-700 bg-gradient-to-tr from-indigo-700/10 to-cyan-700/10">

                <h2>Thank you for joining our research community!</h2>
                <p>We have sent you an email to {userEmail} with a magic link that will create your account with RCSrc Canada. Please check your email to verify it!</p>

            </div>
        )

    } else {

        return (

            <>

                <div className="flex flex-col w-full my-5">

                    <button
                        className={`${buttonClass} bg-slate-800/25 hover:bg-slate-800/40`}
                        onClick={() => signIn("github", { callbackUrl })}
                    >
                        <Image
                            src={githubMark}
                            alt="Github"
                            width={24}
                            height={24}
                        />
                        Sign in with GitHub
                    </button>

                    <button
                        className={`${buttonClass} bg-blue-800/25 hover:bg-blue-900/40 `}
                        onClick={async () => {
                            await signIn("google", { callbackUrl })
                        }}>

                        <Image
                            src={googleMark}
                            alt="Google"
                            width={24}
                            height={24}
                        />
                        Sign in with Google
                    </button>

                </div>

                <form className="space-y-6 w-full" onSubmit={handleSubmit(submitLoginForm)}>
                    
                    <div>
                        
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300">Email address</label>
                        
                        <div className="mt-2">

                            <input
                                id="email"
                                name="email"
                                type="email"
                                {...register("email", { required: true, onChange: (e) => {
                                    setUserEmail(e.target.value)
                                }})}
                                autoComplete="email"
                                placeholder='mail@provider.com'
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                        </div>
                    
                    </div>

                    <div>

                        <p className='text-sm font-mono text-red-700'>{errors.email?.message}</p>

                    </div>

                    <div>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >Sign in</button>

                    </div>

                    <div className='text-white/50 font-mono text-sm'>

                        <SecondaryBodyText className='mb-2'><i>Super secret info for developers:</i></SecondaryBodyText>

                        <div className='p-4 rounded-md border-2 border-white/20'>

                            <pre>Render count: {JSON.stringify(renderCount)}</pre>
                        
                        </div>

                    </div>

                </form>

            </>
            
        )

    }

}
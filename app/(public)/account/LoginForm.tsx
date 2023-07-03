'use client'

import { Auth } from 'aws-amplify'
import { useAuthenticator } from '@aws-amplify/ui-react';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Component, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@aws-amplify/ui-react';
import { SecondaryBodyText } from '../../_primitives/Typography';
import { CognitoUser } from '@aws-amplify/auth';

let renderCount = 0;

export const LoginForm = async () => {

    renderCount++;

    const LoginForm = z.object({
        email: z.string().min(1, { message: 'Email is required.' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long.' })
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
            password: ''
        },
        resolver: zodResolver(LoginForm)
    });
    
    const submitLoginForm = async (data) => {

        console.log(data);

        try {

            const request = await Auth.signIn(data.email, data.password);

        } catch (error) {

            console.log(error);
            setError('email', { type: error.type, message: 'Username or password is incorrect.' });

        }

    }

    const router = useRouter();

    const { route, user, signOut } = useAuthenticator(context => [context.route, context.user, context.isPending])

    if (route === 'idle')
        return <Loader size="large" />;

    if (route === 'authenticated')
        router.replace('/account');

    return (

        <>

            <form className="space-y-6" action="addItem" onSubmit={handleSubmit(submitLoginForm)}>
                
                <div>
                    
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-300">Email address</label>
                    
                    <div className="mt-2">

                        <input
                            id="email"
                            name="email"
                            type="email"
                            {...register("email", { required: true })}
                            autoComplete="email"
                            placeholder='mail@provider.com'
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                    </div>
                
                </div>

                <div>

                    <div className="flex items-center justify-between">

                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-300">Password</label>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-500 hover:text-indigo-400">Forgot password?</a>
                            </div>

                    </div>

                    <div className="mt-2">
                        
                        <input
                            id="password"
                            name="password"
                            type="password"
                            {...register("password", { required: true })}
                            autoComplete="current-password"
                            placeholder='●●●●●●●●●'
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />

                    </div>

                </div>

                <div>

                    <p className='text-sm font-mono text-red-700'>{JSON.stringify(errors.email?.message)}</p>

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

                        <pre>Route: {route}</pre>
                        <pre>User: {JSON.stringify(user)}</pre>
                        <pre>Render count: {JSON.stringify(renderCount)}</pre>
                    
                    </div>

                </div>

            </form>

        </>
        
    )

}
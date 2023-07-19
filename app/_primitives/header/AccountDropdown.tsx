'use client'

import { block } from 'million/react'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { hasFetchedAtom, sessionAtom, signOutAtom, useUser } from '../../_providers/JotaiProvider';
import { z } from 'zod';

import Image from 'next/image';
import { slugify } from '../../_utils/utils';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MoleculeBadge } from '../../(public)/molecules/MoleculeBadge';
import { isClientAtom } from '../../_providers/isClientProvider';

export const Avatar = block(({ email }) => (

    <Image
        src={`https://api.dicebear.com/6.x/bottts/png?seed=${slugify(email.split('@')[0])}}`}
        width={50}
        height={50}
        className='mask mask-hexagon bg-accent mx-4 opacity-75 hover:opacity-100 hover:transform hover:scale-110 transition-all duration-200 ease-in-out'
        alt={''}
    />

));

const isOpenAtom = atom<boolean>(false)

export const SignInButton = block(() => {

    const router = useRouter();

    return (

        <button className="btn btn-primary" onClick={() => router.push('/account/login')}>
            Sign In        
        </button>
        
    );

});

export const AccountDropdown = () => {

    const { authenticated, user } = useUser();
    const [, signOut] = useAtom(signOutAtom);
    const [isOpen, setIsOpen] = useAtom(isOpenAtom);
    const isClient = useAtomValue(isClientAtom);

    useEffect(() => {

        const handleEscape = (e) => {
            if(e.key === 'Escape') {
                setIsOpen(false);
            }
        }
        
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        }

    })

    if( !isClient )
        return null;

    if( !user )
        return <SignInButton />


    return (

        <>

            <div>

                <h3 className='text-right font-semibold font-mono -translate-x-2'>{user.name}</h3>

                {user.roles.map((role, index) => (
                    <span className={`
                    text-md px-2 py-1 my-1 mx-[2px] bg-gradient-to-tr from-sky-400/25 to-cyan-950 rounded-full border-[1px] border-cyan-700
                    items-center justify-center inline-flex mr-1 whitespace-nowrap w-min flex-shrink flex-grow-0 h-min
                    text-sm leading-tight text-sky-300 font-extralight font-mono`}>{role}</span>
                ))}   

            </div>

            <div className="dropdown dropdown-end">

                <label onClick={() => {
                    setIsOpen(isOpen ? false : true)
                }} tabIndex={0} className="m-1 cursor-pointer bg-neutral w-min">
                    <Avatar email={user.email}/>
                </label>

                <ul tabIndex={0} className={`dropdown-content -translate-x-5 ${isOpen ? `block` : `hidden`} z-[1] menu p-2 bg-slate-100 text-md font-semibold shadow-lg text-slate-800 rounded-box w-52`}>

                    <li key={1} className='hover:bg-slate-300 mb-1 rounded-lg'>
                        <Link href={`/account/`}>My Account</Link>
                    </li>

                    <li key={1} className='hover:bg-slate-300 mb-1 rounded-lg'>
                        <Link href={`/account/`}>My Orders</Link>
                    </li>
                    
                    <li key={2}>
                        
                        <button
                            onClick={() => {
                                signOut({ redirect: false, callbackUrl: '/' });
                            }}
                            className='bg-red-200 hover:bg-red-400 hover:text-white'>
                                Logout
                        </button>
                    
                    </li>

                </ul>

            </div>

        </>

    )

}
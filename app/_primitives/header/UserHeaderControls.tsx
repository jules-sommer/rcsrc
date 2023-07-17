"use client"

import UserSettingsDropdown from "./UserSettingsDropdown";

import { isClientAtom } from "../../_providers/isClientProvider";
import { asyncSessionAtom, UserSession, isAuthenticatedAtom, signOutAtom, sessionAtom, asyncFetchSession, useUserData } from "../../_providers/JotaiProvider";
import { useRouter } from 'next/navigation';
import { Atom, useAtom, useAtomValue } from "jotai";

const Badge = ({ children, variation, size, className }) => {

    return (

        <span className={`font-mono text-sm ${className}`}>{children}</span>

    )

}

const UserHeaderLoadingSkeleton = () => (

    <div className="flex flex-row">
        
        <div className='flex flex-col items-end justify-center leading-tight'>
            <p className="block text-sky-100 min-w-[75px] min-h-[20px] rounded-md bg-slate-700/75 animate-pulse font-medium font-mono text-s"/>
            <span className={`
            text-md px-2 py-1 my-1 mx-[2px] bg-gradient-to-tr from-sky-400/25 to-cyan-950 rounded-full border-[1px] border-cyan-700
            items-center justify-center inline-flex mr-1 whitespace-nowrap w-min flex-shrink flex-grow-0 h-min
            text-sm leading-tight text-sky-300 font-extralight font-mono`}>loading...</span>
        </div>

        <UserSettingsDropdown />

    </div>

);

const UserHeaderControls = () => {

    const { authenticated, user } = useUserData();

    const [, signOut] = useAtom(signOutAtom);

    const router = useRouter();

    const isClient = useAtomValue(isClientAtom);

    if (!isClient || !authenticated)
        return null;

    if(  authenticated == true ) {
    
        let hasName = user.name ? true : false;

        return (
        
            <div className="flex flex-row">

                <div className='flex flex-col items-end justify-center leading-tight'>
                    <p className="block text-sky-100 font-medium font-mono text-s">{hasName ? user.name : user.email}</p>
                    <div className="flex flex-row">
                        {user.roles ? user.roles.map((thisGroup) => (
                            <span className={`
                            text-md px-2 py-1 my-1 mx-[2px] bg-gradient-to-tr from-sky-400/25 to-cyan-950 rounded-full border-[1px] border-cyan-700
                            items-center justify-center inline-flex mr-1 whitespace-nowrap w-min flex-shrink flex-grow-0 h-min
                            text-sm leading-tight text-sky-300 font-extralight font-mono`}>{thisGroup}</span>
                        )) : null}
                    </div>
                </div>

                <UserSettingsDropdown />

            </div>

        )

    }
    
    return (

        <div className="flex flex-row">

            <button
                onClick={() => {
                    router.push('/account/login')
                }}
                className="font-mono inline-flex text-sky-200 rounded-md px-2 py-2 border-[1px] border-sky-300/50 hover:border-sky-600/75 hover:bg-sky-900/50"
            >
                <span className='material-symbols-rounded p-0'>
                    login
                </span>
                <span className="ml-2">
                    Login
                </span>
            </button>

        </div>

    );

}

export default UserHeaderControls;
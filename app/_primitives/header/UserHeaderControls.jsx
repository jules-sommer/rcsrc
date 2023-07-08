"use client"

import UserSettingsDropdown from "./UserSettingsDropdown";

import { useUserInfo } from "../../_providers/useUserInfo";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

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

const UserHeaderControls = async () => {

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading')
        return <UserHeaderLoadingSkeleton/>

    if (status === 'authenticated') {
    
        let hasName = session.user.name ? true : false;

        return (
        
            <div className="flex flex-row">
    
                <div className='flex flex-col items-end justify-center leading-tight'>
                    <p className="block text-sky-100 font-medium font-mono text-s">{hasName ? session.user.name : session.user.email}</p>
                    <div className="flex flex-row">
                        {session.user.roles ? session.user.roles.map((thisGroup) => (
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

    } else {
        
        return (

            <div className="flex flex-row">

                <button
                    variation={'default'}
                    onClick={() => {
                        router.push('/account/login')
                    }}
                    size="small"
                    className="font-mono inline-flex text-sky-200 rounded-md px-2 py-2 border-[1px] border-sky-300/50 hover:border-sky-600/75 hover:bg-sky-900/50"
                >
                    <span className='material-symbols-rounded p-0'>
                        login
                    </span>
                    <span class="ml-2">
                        Login
                    </span>
                </button>

            </div>

        );

    }

}

export default UserHeaderControls;
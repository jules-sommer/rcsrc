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
            <Badge variation="info" className='block bg-sky-600/75 min-h-[15px] animate-pulse min-w-[35px] text-sm leading-tight mt-1 py-[2px] px-3 text-sky-100 font-extralight font-mono' size='large'/>
        </div>

        <UserSettingsDropdown />

    </div>

);

const UserHeaderControls = async () => {

    const { data: session, status } = useSession();
    const { authState, signIn, signOut } = useUserInfo();

    const router = useRouter();

    if (status === 'loading')
        return <p>Loading user data...</p>

    if (status === 'authenticated') {
    
        return (
        
            <div className="flex flex-row">
    
                <div className='flex flex-col items-end justify-center leading-tight'>
                    <p className="block text-sky-100 font-medium font-mono text-s">{session.user.name}</p>
                    <div className="flex flex-row">
                        {session.user.roles ? session.user.roles.map((thisGroup) => (<Badge variation="info" className='block bg-sky-600 text-sm leading-tight mt-1 py-[2px] px-3 text-sky-100 font-extralight font-mono' size='large'>{thisGroup}</Badge>)) : null}
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
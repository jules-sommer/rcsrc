'use client'

import { useUserInfo } from "../../_providers/useUserInfo";
import { View, Button, Badge } from "@aws-amplify/ui-react";
import UserSettingsDropdown from "./UserSettingsDropdown";
import { useRouter } from "next/navigation";

const UserHeaderLoadingSkeleton = () => (

    <View className="flex flex-row">
        
        <View className='flex flex-col items-end justify-center leading-tight'>
            <p className="block text-sky-100 min-w-[75px] min-h-[20px] rounded-md bg-slate-700/75 animate-pulse font-medium font-mono text-s"/>
            <Badge variation="info" className='block bg-sky-600/75 min-h-[15px] animate-pulse min-w-[35px] text-sm leading-tight mt-1 py-[2px] px-3 text-sky-100 font-extralight font-mono' size='large'/>
        </View>

        <UserSettingsDropdown />

    </View>

);

const UserHeaderControls = () => {

    const [
        user,
        route,
        signOut
    ] = useUserInfo();

    const router = useRouter();

    const signInRedirect = () => {
        router.push('/account/login')
    }

    if (route === 'idle') {

        return (
            <UserHeaderLoadingSkeleton/>
        )

    } else if (route === 'authenticated') {
        
        return (
        
            <View className="flex flex-row">
    
                <View className='flex flex-col items-end justify-center leading-tight'>
                    <p className="block text-sky-100 font-medium font-mono text-s">{user.name}</p>
                    {user.groups ? user.groups.map((thisGroup) => (<Badge variation="info" className='block bg-sky-600 text-sm leading-tight mt-1 py-[2px] px-3 text-sky-100 font-extralight font-mono' size='large'>{thisGroup}</Badge>)) : null}
                </View>
    
                <UserSettingsDropdown />
    
            </View>
    
        )

    } else {
        
        return (

            <View className="flex flex-row">

                <Button
                    variation={'default'}
                    onClick={signInRedirect}
                    size="small"
                    className="font-mono inline-flex text-sky-200 rounded-md border-sky-600 hover:border-sky-600 hover:bg-sky-600"
                >
                    <span className='material-symbols-rounded p-0'>
                        login
                    </span>
                    <span class="ml-2">
                        Login
                    </span>
                </Button>

            </View>

        );

    }

}

export default UserHeaderControls;
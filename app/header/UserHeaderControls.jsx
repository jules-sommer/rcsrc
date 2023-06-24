'use client'

import useUserInfo from "../_providers/useUserInfo";
import { View, Button, Badge } from "@aws-amplify/ui-react";
import UserSettingsDropdown from "./UserSettingsDropdown";
import { useRouter } from "next/navigation";

const UserHeaderControls = () => {

    const [authedUser, setAuthedUser, signOut] = useUserInfo();

    const router = useRouter();

    const handleSignOut = () => {

        setAuthedUser({});
        signOut();

    }

    const signInRedirect = () => {

        router.push('/account')

    }

    if (!authedUser.isAuthenticated) {
        
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

    return (
        
        <View className="flex flex-row">

            <View className='flex flex-col items-end justify-center leading-tight'>
                <p className="block text-sky-100 font-medium font-mono text-s">{authedUser.name}</p>
                <Badge variation={'info'} className="block bg-sky-600 text-sm leading-tight mt-1 py-[2px] px-3 text-sky-100 font-extralight font-mono text-s">{authedUser.roles[0]}</Badge>
            </View>

            <UserSettingsDropdown />

        </View>

    )

}

export default UserHeaderControls;
import { useAtom } from "jotai";
import { sessionAtom, useUserData } from "../../../../_providers/JotaiProvider";
import { isLoadingAtom } from "../EditProfileWrapper";

export const EditAddresses = ({ tabTitle, display } : { tabTitle: string, display: boolean }) => {

    const { authenticated, user } = useUserData();
    const [session, setSession] = useAtom(sessionAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    if( !display )
        return null;

    return (

        <div className={`${display ? 'block' : 'hidden'}`}>

            <h1>{tabTitle}</h1>

        </div>

    )

}
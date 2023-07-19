import { useAtom } from "jotai";
import { sessionAtom, useUser } from "../../../../_providers/JotaiProvider";
import { isLoadingAtom } from "../EditProfileWrapper";

export const EditAddresses = ({ tabTitle, display } : { tabTitle: string, display: boolean }) => {

    const { authenticated, user } = useUser();
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
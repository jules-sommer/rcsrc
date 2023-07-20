import { getServerSession } from "next-auth";
import { SessionInitialize, UserSession } from "./JotaiProvider";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export const SessionInitializeWrapper = async () => {

    let serverSession: UserSession = await getServerSession(authOptions);

    if( serverSession ) {

        serverSession = {
            ...serverSession,
            authenticated: true
        }

    } else {

        serverSession = {
            user: null,
            authenticated: false,
        }

    }

    return (

        <SessionInitialize session={serverSession} />
    
    )

}
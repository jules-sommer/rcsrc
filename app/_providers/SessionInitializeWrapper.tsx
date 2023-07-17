import { getServerSession } from "next-auth";
import { SessionInitialize, UserSession } from "./JotaiProvider";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export const SessionInitializeWrapper = async () => {

    const serverSession: UserSession = await getServerSession(authOptions);

    return (
        <SessionInitialize session={serverSession} />
    )

}
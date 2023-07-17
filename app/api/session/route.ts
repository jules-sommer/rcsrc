import { authOptions } from "../auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse(
            JSON.stringify({
                authenticated: !!session,
                session: null,
                message: "401: Unauthorized, you are not logged in.",
            }),
            { status: 401 }
        );
    }

    return NextResponse.json({
        authenticated: !!session,
        session,
    }, { status: 200 });

}
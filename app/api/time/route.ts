import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {

    return NextResponse.json({
        time: Date.now(),
    }, { status: 200 });

}
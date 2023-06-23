import { Headers, NextResponse } from "next/server"
import { stdout } from "process";
/*
export async function Middleware(request) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-scaffold', request.nextUrl.searchParams);

    stdout.write(`\n x-scaffold: ${JSON.stringify(request.nextUrl.searchParams)} ( middleware.js )\n\n`)

    return NextResponse.next({
        request: {
            headers: requestHeaders
        }
    })
}
*/
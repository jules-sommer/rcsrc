import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    async (req) => {
        console.log(`Next auth token ( at the Edge ):`)
        console.log(req.nextauth.token)
    },
    {
        callbacks: {
            authorized: ({ req, token } : { req: NextRequest, token }) => {
                if(token?.role === "admin") {
                    return true;
                } else {
                    console.log(req)
                    console.log(token)
                }
                
            }
        },
    }
)

export const config = { matcher: ["/dashboard"] }
import { authOptions } from './auth'
import { NextRequest, NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'

import {
	NextApiRequest,
	NextApiResponse,
	NextComponentType,
	NextPageContext,
} from 'next'

import NextAuth from 'next-auth'

const auth = async (req: NextApiRequest, res: NextApiResponse) => {
	return await NextAuth(req, res, authOptions)
}

export { auth as GET, auth as POST, auth as PUT, auth as DELETE }

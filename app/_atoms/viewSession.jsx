'use client'

import { useAtom, useAtomValue } from 'jotai'
import {
	sessionAtom,
	asyncSessionAtom,
	fetchedSessionAtom,
	isAuthenticatedAtom,
	useUser,
	hasFetchedAtom,
    userEmailAtom,
	cartAtom
} from '../_providers/JotaiProvider'
import { cartItemAtom } from './cartItemAtom'

export const ViewSession = ({ children }) => {
	const fetchedSession = useAtomValue(fetchedSessionAtom)

	const { authenticated, user } = useUser()

	const session = useAtomValue(sessionAtom)
	const isAuthed = useAtomValue(isAuthenticatedAtom)
	const userEmail = useAtomValue(userEmailAtom)

	console.log(session)
	console.log(isAuthed)
	console.log(userEmail)
	console.log(authenticated)
	console.log(user)
	console.log(fetchedSession)

	return (

		<>
			
			{children}

			<div className="collapse fixed bg-neutral-100 fixed rounded-lg z-100 transition-all ease-in-out left-5 bottom-5 max-w-md max-h-[600px] overflow-y-scroll text-sm text-black">
				
				<input
					className="!w-[488px] h-full"
					type="checkbox"
				/>

				<div className="collapse-title fixed !w-[450px] px-4 bg-slate-300 rounded-lg flex items-center justify-between text-xl font-medium">
					
					View developer tools
					<span className="material-symbols-rounded">
						unfold_more
					</span>

				</div>

				<div className="collapse-content">

					<pre>
						fetchedSession: {JSON.stringify(fetchedSession, undefined, 4)}
					</pre>
					<pre>
						authenticated:{' '}
						{JSON.stringify(authenticated, undefined, 4)}
					</pre>
					<pre>
						Cart Item Atom:{' '}
						{JSON.stringify(cartItemAtom, undefined, 4)}
						Cart Atom:{' '}
						{JSON.stringify(cartAtom, undefined, 4)}
					</pre>
					<pre>
						user: {JSON.stringify(user, undefined, 4)}
					</pre>
					<pre>
						session:{' '}
						{JSON.stringify(session, undefined, 4)}
					</pre>
					<pre>
						isAuthed:{' '}
						{JSON.stringify(isAuthed, undefined, 4)}
                    </pre>
                    <pre>
						userEmailAtom:{' '}
						{JSON.stringify(userEmail, undefined, 4)}
					</pre>

				</div>

			</div>

		</>

	)

}

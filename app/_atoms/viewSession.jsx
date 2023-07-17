'use client'

import { useAtom, useAtomValue } from 'jotai'
import {
	sessionAtom,
	asyncSessionAtom,
	isAuthenticatedAtom,
    useUserData,
    userEmailAtom
} from '../_providers/JotaiProvider'

export const ViewSession = ({ children }) => {
	const { state, data } = useAtomValue(asyncSessionAtom)
	const { authenticated, user } = useUserData()

	const session = useAtomValue(sessionAtom)
	const isAuthed = useAtomValue(isAuthenticatedAtom)
	const userEmail = useAtomValue(userEmailAtom)

	if (state !== 'hasData') return null

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
						state: {JSON.stringify(state, undefined, 4)}
					</pre>
					<pre>
						authenticated:{' '}
						{JSON.stringify(authenticated, undefined, 4)}
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

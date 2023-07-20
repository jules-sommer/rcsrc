'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isClientAtom } from '../../_providers/isClientProvider';
import { useAtomValue } from 'jotai';

export const CartControls = () => {

	const isClient = useAtomValue(isClientAtom);
	const router = useRouter();

	if (!isClient)
		return null;

	return (

		<Link
			href='/cart'
			className='flex items-center justify-center'
		>
			<span className='material-symbols-rounded text-slate-300 cursor-pointer hover:scale-105 hover:text-white transition-all ease-in-out hover:-translate-y-1'>shopping_cart</span>
		</Link>

	);

};

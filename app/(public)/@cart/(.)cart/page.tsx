'use client';

import { usePathname, useRouter } from 'next/navigation';

const CartModal = () => {

	const router = useRouter();
	const pathname = usePathname();

	return (

		<div>

			<h1>this is the cart modal</h1>

		</div>

	);

};

export default CartModal;

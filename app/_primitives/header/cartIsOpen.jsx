'use client'

import { usePathname, useRouter } from "next/navigation";
import { useCartOpen } from "../../_providers/useCartOpen";

const CartIsOpen = () => {

    const isOpen  = useCartOpen();

    return ( <p className="text-white">CART OPEN: {JSON.stringify(isOpen)}</p> )

}

export default CartIsOpen;
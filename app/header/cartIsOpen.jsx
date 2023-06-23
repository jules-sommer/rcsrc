'use client'

import { useIsClient } from "../isClientProvider";
import { usePathname, useRouter } from "next/navigation";
import { useCartOpen } from "../useCartOpen";

const CartIsOpen = () => {

    const isOpen  = useCartOpen();

    return ( <p className="text-white">CART OPEN: {JSON.stringify(isOpen)}</p> )

}

export default CartIsOpen;
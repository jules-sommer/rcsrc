'use client'

import { useState, useMemo, useRef } from "react";
import { useIsClient } from "./isClientProvider";
import { usePathname, useRouter } from "next/navigation";

export const useCartOpen = () => {

    const isClient = useIsClient();
    const router = useRouter();
    const pathname = usePathname();

    const referrer = useRef(pathname);
    const [isOpen, setIsOpen] = useState(false);

    console.log("pathname:", pathname);
    console.log("isCartOpen:", isOpen);
    console.log("referrer:", referrer);

    useMemo(() => {

        referrer.current = pathname;

        if (pathname === '/cart')
            setIsOpen(true);
        else
            setIsOpen(false)

    }, [pathname])

    return isOpen;

};
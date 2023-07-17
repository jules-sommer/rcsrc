'use client'

import { useState, useMemo, useRef } from "react";
import { isClientAtom } from "./isClientProvider";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

export const useCartOpen = () => {

    const isClient = useAtomValue(isClientAtom);
    const router = useRouter();
    const pathname = usePathname();

    const referrer = useRef(pathname);
    const [isOpen, setIsOpen] = useState(false);

    useMemo(() => {

        referrer.current = pathname;

        if (pathname === '/cart')
            setIsOpen(true);
        else
            setIsOpen(false)

    }, [pathname])

    return isOpen;

};
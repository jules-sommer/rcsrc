'use client'

import { isClientAtom } from "./isClientProvider";
import { useAtomValue, useAtom } from "jotai";

const cartDrawerAtom = atom(false);

const toggle = () => {

    const [isOpen, setIsOpen] = useAtom(cartDrawerAtom);

    isOpen ? setIsOpen(false) : setIsOpen(true);

    return isOpen;

}

export const useCartOpen = () => {

    const isClient = useAtomValue(isClientAtom);
    const isOpen = useAtomValue(cartDrawerAtom);

    return {
        toggle,
        isOpen,
    };

};
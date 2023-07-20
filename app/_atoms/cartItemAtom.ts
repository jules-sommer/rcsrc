import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { CartItem } from "@providers/JotaiProvider";

export const cartItemAtom = atom<CartItem>({
    _id: "",
    product: {
        _id: "",
        name: "",
        CAS: "",
        smiles: "",
    },
    configuration: {
        format: 'powder',
        solvent: '',
        concentration: {
            value: 0,
            unit: 'mg/ml',
        },
        container: '',
    },
    quantity: {
        value: 0,
        unit: 'mg',
    },
    createdAt: 0,
    updatedAt: 0,
});

export const formatAtom = focusAtom<any, string, any>(cartItemAtom, (optic) => optic.prop("configuration").prop("format"));

export const isSolutionAtom = atom(
    (get) => get(formatAtom) === 'solution',
    (get, set, update: boolean) => set(formatAtom, update ? 'solution' : 'powder')
);

export const concentrationAtom = focusAtom<any, {
    value: number,
    unit: string,
}, any>(cartItemAtom, (optic) => optic.prop("configuration").prop("concentration"));

export const quantityAtom = focusAtom<any, {
    value: number,
    unit: string,
}, any>(cartItemAtom, (optic) => optic.prop("quantity"));

export const solventAtom = focusAtom<any, string, any>(cartItemAtom, (optic) => optic.prop("configuration").prop("solvent"));

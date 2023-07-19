'use client'

import { useAtom } from 'jotai/react';

import { cartItemAtom } from '../../../_atoms/cartItemAtom';
import { CartItem } from '../../../_providers/JotaiProvider';
import { useEffect } from 'react';
import FormatSelector from './_components/FormatSelector';

const OrderConfigurator = ({ product }) => {

    const [cartItem, setCartItem] = useAtom(cartItemAtom);

    useEffect(() => {

        // CART ITEM Obj that gets sent down to order configurator
        setCartItem(({
        _id: "",
        product: {
            _id: product._id,
            name: product.name,
            CAS: product.CAS,
            smiles: product.smiles
        },
        configuration: {
            format: 'solution',
            solvent: '',
            concentration: {
            value: 0,
            unit: 'mg/ml'
            },
            container: ''
        },
        quantity: {
            value: 0,
            unit: 'mg'
        },
        createdAt: 0,
        updatedAt: 0
        } as CartItem));

    }, []);

    return (

        <div className="grid grid-cols-6 grid-rows-6 mx-auto gap-5">

            <FormatSelector product={product}/>

        </div>       

    )

}

export default OrderConfigurator;
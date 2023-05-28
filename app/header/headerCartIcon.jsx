"use client"

import NavLink from "../navLink"
import { useContext } from "react"
import { CartStateContext, CartDispatchContext } from "../cartProvider"

const HeaderCartIcon = () => {

    const state = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext);

    console.log( state );

    return (
        
        <nav className='flex select-none items-center justify-center'>
            <NavLink classes="!mr-0 items-center justify-center flex" href='/cart'>
                <span class="material-symbols-rounded" onClick={() => dispatch({ type: 'UPDATE_CART_STATE', isOpen: true })}>Shopping_cart</span>
                {state.items.length > 0 ? (
                    <span className="relative right-[0.2rem] -top-[1rem] flex items-center justify-center text-sm w-5 h-5 bg-emerald-700 rounded-full">{state.items.length}</span>
                ) : null }
                </NavLink>
        </nav>

    )

}

export default HeaderCartIcon;
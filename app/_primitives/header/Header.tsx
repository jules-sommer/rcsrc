import Link from "next/link"
import { Suspense } from "react";

import { NavLink } from "@ui/NavLink"
import { Logo } from "@ui/Logo"
import { CartControls } from '@ui/header/CartControls';
import { AccountDropdown } from "@ui/header/AccountDropdown";
import { getServerSession } from "next-auth";
import { authOptions } from "@rcsrc/auth";

export const Header = async ({

    size = 'full',
    showCart = true,
    showUser = true,
    homeLink = false,
    isFixed = true,

} : {

    size: "full" | "condensed" | "mini",
    showCart: boolean,
    showUser: boolean,
    homeLink: boolean,
    isFixed: boolean,

}) => {

    const serverSession = await getServerSession(authOptions);

    const SizedLogo = () => {

        if( size === 'full' )
            return <Logo />
        else if (size === 'condensed')
            return <Logo scale={0.65} />
        else
            return <Logo />

    }

    console.log(showUser)
    console.log(showUser && 'something happens')

    return (

        <header className={`p-5 bg-sky-900/60 z-[101] left-0 right-0 flex justify-between items-center backdrop-blur-md ${isFixed ? 'fixed' : 'static'} ${size === 'full' ?  'h-[86px]' : 'h-[64px]'} overflow-visible`}>
            <div className='w-9/12 mx-auto flex justify-between items-center'>

                <Link href='/' className="flex items-center justify-center">

                    <div className='flex items-center justify-center'>
                    <SizedLogo />
                    {size === 'full' && <h1 className='font-mono subpixel-antialiased text-slate-300 select-none font-bold text-2xl'>rcsrc canada</h1>}
                </div>
                </Link>

                <nav className='flex justify-end select-none items-center'>
                    <NavLink href='/molecules'>Molecules</NavLink>
                </nav>

                <div className="grid auto-cols-auto grid-rows-1 grid-flow-col gap-3 shrink-0 justify-end items-center place-content-center">
                    <Suspense fallback={<h1>Loading client header UI</h1>}>
                        {showUser && <AccountDropdown serverSession={serverSession} />}
                        {showCart && <CartControls />}
                    </Suspense>
                </div>

                {homeLink && (

                    <div>
                        <Link
                            href={'/'}
                            className="flex align-middle justify-center font-mono font-medium text-sky-100/80 hover:text-sky-100/100 transition-all cursor-pointer"
                        ><span className="material-symbols-rounded">arrow_left</span>Take me back home</Link>
                    </div>

                )}

            </div>
        </header>

    )

}

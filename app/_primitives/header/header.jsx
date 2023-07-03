import NavLink from "../navLink"
import Logo from "../Logo"
import Link from "next/link"
import HeaderCartIcon from './headerCartIcon';
import UserHeaderControls from "./UserHeaderControls";
import { Suspense } from "react";

const Header = ({

        size = 'full',
        showCart = true,
        showUser = true,
        homeLink = false,
        isFixed = true,
    
    }) => {

    const SizedLogo = () => {

        if( size === 'full' )
            return <Logo />
        else if (size === 'condensed')
            return <Logo scale={0.65} />
        else
            return <Logo />

    }
    
    return (

        <header className={`p-5 bg-sky-900/60 z-[101] left-0 right-0 flex justify-between items-center backdrop-blur-md ${isFixed ? 'fixed' : 'static'} ${size === 'full' ?  'h-[86px]' : 'h-[64px]'} overflow-visible`}>
            <div className='w-9/12 mx-auto flex justify-between items-center'>
                
                <Link href='/' className="flex items-center justify-center">
                
                    <div className='flex items-center justify-center'>
                    <SizedLogo />
                    {size === 'full' ? (<h1 className='font-mono subpixel-antialiased text-slate-300 select-none font-bold text-2xl'>rcsrc canada</h1>) : null}
                </div>
                </Link>

                <nav className='flex justify-end select-none items-center'>
                    <NavLink href='/molecules'>Molecules</NavLink>
                </nav>

                

                <div className="grid auto-cols-auto grid-rows-1 grid-flow-col gap-3 shrink-0 justify-end items-center place-content-center">
                    <Suspense>
                        {showUser ? (<UserHeaderControls />) : null}
                        {showCart ? ( <HeaderCartIcon /> ) : null}
                    </Suspense>
                </div>

                {homeLink === true ? (
                
                    <div>
                        <Link
                            href={'/'}
                            className="flex align-middle justify-center font-mono font-medium text-sky-100/80 hover:text-sky-100/100 transition-all cursor-pointer"
                        ><span className="material-symbols-rounded">arrow_left</span>Take me back home</Link>
                    </div>

                ) : null}

            </div>
        </header>

    )

}

export default Header;
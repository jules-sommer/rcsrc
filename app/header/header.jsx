import NavLink from "../navLink"
import Logo from "../logo"
import Link from "next/link"
import HeaderCartIcon from './headerCartIcon';
import CartIsOpen from "./cartIsOpen";
import UserHeaderControls from "./UserHeaderControls";

const Header = () => {

    return (

        <header className='p-5 bg-sky-900/60 z-50 left-0 right-0 flex justify-between items-center backdrop-blur-md fixed max-h-[86px] overflow-visible'>
            <div className='w-9/12 mx-auto flex justify-between items-center'>
                
                <Link href='/' className="flex items-center justify-center">
                
                    <div className='flex items-center justify-center'>
                    <Logo />
                    <h1 className='font-mono subpixel-antialiased text-slate-300 select-none font-bold text-2xl'>rcsrc canada</h1>
                </div>
                </Link>

                <nav className='flex justify-end select-none items-center'>
                    <NavLink href='/molecules'>Molecules</NavLink>
                </nav>

                <div className="grid auto-cols-auto grid-rows-1 grid-flow-col gap-3 shrink-0 justify-end items-center place-content-center">
                    <UserHeaderControls />
                    <HeaderCartIcon />
                </div>
                
                

            </div>
        </header>

    )

}

export default Header;
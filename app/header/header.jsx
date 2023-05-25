import NavLink from "../navLink"
import Logo from "../logo"
import Link from "next/link"

const Header = () => {

    return (

        <header className='p-5 bg-slate-900 flex justify-between align-middle '>
            <div className='w-9/12 mx-auto flex justify-between content-center'>
                <Link href='/'>
                <div className='flex align-middle'>
                    <Logo />
                    <h1 className='font-mono subpixel-antialiased text-slate-300 select-none font-bold text-2xl'>rcsrc canada</h1>
                </div>
                </Link>

                <nav className='flex justify-end select-none items-center'>
                    <NavLink href='/about'>About</NavLink>
                    <NavLink href='/molecules'>Molecules</NavLink>
                </nav>
                <nav className='flex justify-end select-none items-center'>
                    <NavLink href='/cart' onClick={console.log('clicked cart')}>
                    </NavLink>
                </nav>
            </div>
        </header>

    )

}

export default Header;
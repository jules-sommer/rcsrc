import Link from 'next/link'

export const NavLink = ({ href, children, className = false }) => (

        <Link
            className={`
                ${className} mr-10 text-slate-300 hover:text-slate-50 hover:drop-shadow-light-xl
                transition-all hover:translate-y-[-1.5px] font-mono subpixel-antialiased font-medium
                select-none leading-none grow-0`}
            href={href}
        >{children}</Link>

);
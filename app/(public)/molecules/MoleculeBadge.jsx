export const MoleculeBadge = ({ variation, className, children, size = 'default' }) => {

    let sizeStyle = ''

    if (size === 'large')
        sizeStyle = 'text-md px-2 py-1 my-1 mx-[2px]'
    else if (size === 'default')
        sizeStyle = 'text-sm px-2 py-2 my-[1px] mx-[2px]'
    else if (size === 'small')
        sizeStyle = 'text-sm p-2 my-[1px] mx-[1px]'

    return (

        <span className={`
            ${className} ${sizeStyle} bg-sky-500/25 rounded-full border-[1px] border-sky-950/75
            items-center justify-center inline-flex mr-1 whitespace-nowrap w-min flex-shrink flex-grow-0 h-min
            text-sm leading-tight text-sky-950 font-extralight font-mono`}>{children}</span>

    )

}
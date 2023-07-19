export const MoleculeBadge = ({ className = '', children, size = 'default' }) => {

    let sizeStyle = ''

    let textSize = size === 'large' ? 'text-md' : 'text-sm';
    let marginPadding = size === 'large' ? 'my-2 mx-2 py-2' : size === 'default' ? 'my-1 mx-2 p-2' : 'my-[2px] py-1 px-2';

    return (

        <span className={`
            ${className} ${marginPadding} ${textSize} bg-sky-500/25 rounded-full border-[1px] border-sky-950/75
            items-center justify-center inline-flex mr-1 whitespace-nowrap w-min flex-shrink flex-grow-0 h-min
            text-sm leading-tight text-sky-950 font-extralight font-mono`}>{children}</span>

    )

}
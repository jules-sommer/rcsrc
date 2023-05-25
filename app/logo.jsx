import Image from "next/image";

const Logo = ({scale = 1}) => {
    return <Image className='mr-5' src="/logo.png" alt="RCSRC Canada" height={30*scale} width={60*scale}/>;
}

export default Logo
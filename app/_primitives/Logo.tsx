import Image from 'next/image';

export const Logo = ({ scale = 1 }) => <Image className="mr-5" src="/logo.png" alt="RCSRC Canada" height={30 * scale} width={60 * scale} />;
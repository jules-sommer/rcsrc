'use client'

import { cartItemAtom } from '../../../_atoms/cartItemAtom';
import { formatAtom } from '../../../../_atoms/cartItemAtom';
import { useAtom } from 'jotai';

const FormatSelector = ({ product }) => {

    const [format, setFormat] = useAtom(formatAtom);
    const formatOptions = [...product.formats]

    return (

        <div className='flex flex-col prose col-span-2 row-span-2'>

            <h2>Choose a format for your purchase:</h2>
            <p>We offer our products in a variety of formats to meet your research needs, common solutions as well as raw powder ( if your lab has specialized needs ) are available.</p>

            <div className="join w-full flex flex-row">
                {formatOptions.map((thisFormat, index) => (
                    <button onClick={() => setFormat(thisFormat)} className={`btn btn-info flex-grow text-white text-lg py-4 flex items-center hover:scale-[1.025] hover:-translate-y-1 justify-center h-auto tracking-widest border-2 border-info ${format == thisFormat ? 'bg-info/25' : 'bg-info/10'} join-item`}>{thisFormat}</button>
                ))}
            </div>

        </div>

    );

}

export default FormatSelector;
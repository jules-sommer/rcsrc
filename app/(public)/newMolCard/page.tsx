import { zObjectId } from '../../_atoms/sessionInitialState';
import { getProducts, getScaffolds } from "../../_utils/api";
import type { Molecule, Orientation } from "./molecule.types";
import { SmileDrawerContainer } from "../../_utils/SmilesDrawerContainer";

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

export const MoleculeCard = ({
    
    key,
    skeleton,
    orientation,
    description,
    molecule

} : {
    key: Number,
    skeleton: Boolean,
    orientation: Orientation,
    description: Boolean,
    molecule: Molecule
}) => {

    console.log(`Skeleton: ${skeleton}`);
    console.log(`Orientation: ${orientation}`);

    const isVertical = orientation === 'vertical' ? true : false;
    const hasDescription = description === true ? true : false;

    return (

        <div {...key} className={`card !h-min flex grid-flow-row-dense shrink bg-white w-full ${isVertical ? 'grid grid-cols-1 grid-rows-3' : 'grid grid-rows-2 grid-cols-2' }`}>

            <div className={`card-image flex flex-grow-0 shrink ${isVertical ? '' : 'h-auto w-full'} p-6 row-span-1 col-span-1`}>
                
                <SmileDrawerContainer
                    className={'card-smiles-image flex w-full h-full grow'}
                    smiles={molecule.smiles}
                    height={'200px'}
                    width={'200px'}
                />

            </div>

            <div className={`card-title flex col-span-1 row-span-1 shrink prose font-mono flex flex-col items-start ${isVertical ? 'pt-0 p-7' : 'pl-0 p-7'}`}>

                <h3 className={`text-2xl m-0 leading-2 p-0 font-semibold text-gray-900`}>{molecule.name}</h3>
                <p className={`text-md m-0 mb-4 p-0 font-light text-gray-900`}>CAS# {molecule.CAS}</p>

                <div className="flex flex-row flex-wrap">

                    {molecule.tags.map((tag, index) => (
                        <MoleculeBadge key={index} size={'small'}>{tag}</MoleculeBadge>    
                    ))}

                </div>

            </div>

            <div className={`card-description flex shrink prose h-min font-mono p-7 ${isVertical ? 'col-span-1' : 'col-span-2'}`}>

                <p className="line-clamp-6">{molecule.description}</p>

            </div>

        </div>

    )

}

const molCardTestingPage = async () => {

    const { success: hasProducts, products } = await getProducts();
    let { success: hasScaffolds, scaffolds } = await getScaffolds(true);

    const orientation = 'horizontal';
    const isVertical = ( orientation === 'vertical' ) ? true : false;

    return (
    
        <>

            <div className={`grid ${isVertical ? 'grid-cols-4' : 'grid-cols-2'} mx-auto px-8 justify-between items-center max-w-9/12 grid-flow-row-dense auto-rows-auto gap-2 w-full items-center justify-center min-h-screen`}>

                {products.map((product, index) => (

                    <MoleculeCard
                        key={index}
                        skeleton={false}
                        orientation={orientation}
                        molecule={products[0] as Molecule}
                        description={true}
                    />

                ))}

            </div>

            <div className="flex flex-row items-center justify-start min-h-screen">

                <pre className="max-h-lg max-w-xl overflow-scroll text-white">{JSON.stringify(products, undefined, 4)}</pre>
                <pre className="max-h-lg max-w-xl overflow-scroll text-white">{JSON.stringify(scaffolds, undefined, 4)}</pre>

            </div>

        </>

    )

}

export default molCardTestingPage;
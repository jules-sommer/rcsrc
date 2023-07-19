import { getProducts, getScaffolds } from "../../_utils/api";
import type { Molecule, Orientation } from "./molecule.types";
import { SmilesDrawerContainer } from "../../_utils/SmilesDrawerContainer";
import { MoleculeCard } from "./MoleculeCard";

const molCardTestingPage = async () => {

    const { success: hasProducts, products } = await getProducts();
    const { success: hasScaffolds, scaffolds } = await getScaffolds(true);

    const orientation = 'horizontal';
    const isVertical = orientation === "horizontal" ? false : true;

    return (
    
        <>

            <div className={`grid ${isVertical ? 'grid-cols-4' : 'grid-cols-2'} mx-auto px-8 justify-center max-w-9/12 grid-flow-row-dense auto-rows-auto gap-2 w-full min-h-screen`}>

                {products.map((product: Molecule, index: number) => (

                    <MoleculeCard
                        key={index}
                        skeleton={false}
                        orientation={orientation}
                        molecule={product}
                        description={true}
                    />

                ))}

            </div>

            <div className="flex flex-row items-center justify-start min-h-screen">

                <pre className="max-h-lg max-w-xl overflow-scroll text-white">{JSON.stringify(products, undefined, 4)}</pre>

            </div>

        </>

    )

}

export default molCardTestingPage;

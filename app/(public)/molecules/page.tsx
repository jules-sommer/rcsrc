import { has } from "lodash";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { SmilesDrawerContainer } from "../../_utils/SmilesDrawerContainer";
import { getProducts, getScaffoldByID, getScaffolds } from "../../_utils/api";
import { slugify } from "../../_utils/utils";
import { MoleculeBadge } from "./MoleculeBadge";
import { Selector } from "./MoleculeScaffoldSort";
import { MoleculeListSkeleton } from './loading';

const MolListItem = async ({ key, isFeatured, name, smiles, CAS, iupac,  description, tags = [], scaffoldID, scaffold: serverScaffold, inStock }) => {

    let { success, scaffold } = await getScaffoldByID({ id: scaffoldID });

	return (

        <Link
            id={key}
            href={`/molecules/${slugify(name)}`}
            aria-disabled={inStock}
            disabled={inStock}
            >

            <div className={`indicator h-64 w-[100%] flex flex-row transition-all ease-in-out hover:origin-center ${inStock ? 'cursor-pointer hover:scale-[1.025] hover:translate-y-[-5px]' : 'opacity-75 cursor-default' } bg-gradient-to-tr from-indigo-200 via-blue-200 to-sky-200 rounded-2xl`}>

                {inStock ? ( <span className="indicator-item badge border-2 border-cyan-400/75 shadow-md badge-secondary -translate-x-2">In Stock!</span> ) : null}
                {isFeatured ? ( <span className="indicator-item badge border-2 border-blue-200/75 badge-info shadow-md translate-x-[-85px]">Featured</span> ) : null}

                <div className={`flex flex-row h-full w-full`}>
                    <div className='w-64 h-64 flex-shrink-0 rounded-2xl bg-transparent'>
                        <SmilesDrawerContainer
                            smiles={smiles}
                            height={"100%"}
                            width={"100%"}
                            theme="github"
                            className={`w-full h-full p-4 pl-6`}
                        />
                    </div>
                    <div className='information p-4 grid grid-cols-4 grid-rows-4 grid-flow-row-dense flex-col'>

                        <div className="flex prose text-slate-900 flex-col col-start-1 col-span-3 row-start-1 row-span-1">

                            <h3 className='name whitespace-nowrap mb-0 text-slate-900 font-mono text-md font-bold'>{name}</h3>
                            <h4 className='font-mono text-slate-600 text-sm mb-2'><b>CAS# </b>{CAS}</h4>
                        
                        </div>


                        <div className="flex flex-row h-min w-min col-start-1 col-span-3 row-start-2 row-span-1 items-start">

                            <Suspense fallback={<div className="h-4 w-full bg-sky-600 animate-pulse" />}>
                                <div className="inline-flex h-min w-auto mr-0 items-center rounded-s-md bg-purple-50 px-2 py-1 text-xs font-bold whitespace-nowrap text-purple-700 ring-2 ring-inset ring-blue-700/30">Category:<br/>Scaffold:</div>
                                <div className="inline-flex h-min w-auto ml-0 items-center rounded-e-md bg-purple-50 px-2 py-1 text-xs font-medium whitespace-nowrap text-purple-700 ring-2 ring-inset ring-blue-700/30">{scaffold.name}<br />{scaffold.iupac}</div>
                            </Suspense>
                                
                        </div>

                        <div className="flex flex-row w-full place-content-start items-start justify-start flex-wrap col-start-1 col-span-4 row-start-3 row-span-2">

                            {tags.map((thisTag, index) => (
                                <MoleculeBadge
                                    key={index}
                                    size={'small'}
                                    className=""
                                >{thisTag}</MoleculeBadge>
                            ))}
                        
                        </div>

                    </div>

                </div>

            </div>

        </Link>

	)

}

const ListAllMolecules = async ({ searchParams }) => {

    console.log(searchParams)
    
    const { success: hasProducts, products } = await getProducts();
    let { success: hasScaffolds, scaffolds } = await getScaffolds(true);
    
    console.log(products)
        
   // const pchem_2d_struct = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${slugify(thisProduct.name).split('-')[0]}/PNG?record_type=2d&image_size=300x300`;

    return (

        <section className="bg-slate-950 h-auto pt-16 pb-16">
        
            <div className="text-sky-100 flex h-[100px] items-center justify-between text-4xl font-mono title w-9/12 mx-auto mb-16">
                
                <h1>Our Catalogue</h1>

                <Suspense>
                    {/*<Selector />*/}
                </Suspense>

            </div>

            <div className="grid grid-cols-2 gap-5 w-[100%] px-12 mx-auto h-auto">

                <Suspense fallback={<MoleculeListSkeleton numGridItems={6} />}>

                    {products.map((thisProduct) => {

                        const scaffold = scaffolds.filter((thisScaffold) => thisScaffold._id === thisProduct.scaffold)
                        const isInStock = thisProduct.inStock.value !== 0 ? true : false;
                        
                        return (
                            
                            <MolListItem
                                key={thisProduct._id}
                                name={thisProduct.name}
                                isFeatured={thisProduct.isFeatured}
                                CAS={thisProduct.CAS}
                                iupac={thisProduct.iupac}
                                description={thisProduct.description}
                                smiles={thisProduct.smiles}
                                tags={thisProduct.tags}
                                scaffoldID={thisProduct.scaffold}
                                scaffold={scaffold.length > 0 ? scaffold[0] : null}
                                inStock={isInStock}
                            />
                    
                        );

                    })}
                    
                </Suspense>

            </div>

        </section>

    )

}

export default ListAllMolecules;
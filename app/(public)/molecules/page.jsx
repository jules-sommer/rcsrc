import { PRODUCT_LIST } from "./molecules.productList"
import { Selector } from "./MoleculeScaffoldSort"
import propTypes from "prop-types";
import Link from "next/link"
import { headers } from "next/headers";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import { slugify } from "../../_utils/utils";
import { has } from "lodash";
import SmilesDrawerContainer from '../../_utils/SmilesDrawerContainer';
import { MoleculeBadge } from "./MoleculeBadge";
import { getProductBySlug, getScaffoldByID, getProducts } from "../../_utils/api";
import { Suspense } from "react";
import { MoleculeListSkeleton } from './loading';

const MolListItem = async ({ key, molName, molSMILES, CAS, description, tags = [], scaffoldID, inStock = true }) => {

    const { success, data } = await getScaffoldByID(scaffoldID);
    let scaffold = null;

    if (success)
        scaffold = data[0];

	return (

        <Link
            key={key}
            id={key}
            href={`/molecules/${slugify(molName)}`}
            aria-disabled={!inStock}
            disabled={!inStock}
            >
            
            <div className={`h-64 w-[100%] flex flex-row transition-all hover:origin-center ${inStock ? 'cursor-pointer hover:scale-[1.025]' : 'opacity-75 cursor-default' } bg-gradient-to-t from-indigo-200 via-blue-200 to-sky-200 rounded-2xl`}>
                <div className='w-64 h-64 flex-shrink-0 rounded-2xl bg-transparent'>
                    <SmilesDrawerContainer
                        SMILES={molSMILES}
                        height={"100%"}
                        width={"100%"}
                        theme="github"
                        className={`w-full h-full p-4 pl-6`}
                    />
                </div>
                <div className='information p-4 grid grid-cols-4 grid-rows-4 grid-flow-row-dense flex-col'>

                    <div className="flex flex-col col-start-1 col-span-3 row-start-1 row-span-1">

                        <h3 className='name whitespace-nowrap text-slate-900 font-mono text-md font-bold'>{molName}</h3>
                        <h4 className='font-mono text-sm mb-2'><b>CAS# </b>{CAS}</h4>
                    
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
                                size={'large'}
                                variation={'info'}
                                className="inline-flex mr-1 whitespace-nowrap w-min flex-shrink flex-grow-0 h-min text-sm leading-tight mt-2 py-[2px] px-3 text-sky-100 font-extralight font-mono "
                            >{thisTag}</MoleculeBadge>
                        ))}
                    
                    </div>

                </div>

            </div>

        </Link>

	)

}

const ListAllMolecules = async () => {

    let url = headers().get('next-url');
    let searchParams = null;

    if (!url) {
        console.warn(`no next-url header`);
    } else {

        searchParams = url.substring(url.indexOf("?") + 1)
                            .split("&")
                            .reduce((memo, param) => ({
                                ...memo,
                                [param.split("=")[0]]: param.split("=")[1]
                            }), {});

    }

    console.log(`URL: ${url}`)
    console.log(`Search Params: ${JSON.stringify(searchParams)}`)

    let filter = null;

    if (has(searchParams, 'scaffold'))
        filter = { 'scaffold': searchParams.scaffold };
    else
        filter = {};
    
    const { success, data } = await getProducts();

    if(!success)
        console.log(error);
    
    console.log(`Success: ${success}`);
    console.log(`Data: ${JSON.stringify(data)}`);

   // const pchem_2d_struct = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${slugify(thisProduct.molName).split('-')[0]}/PNG?record_type=2d&image_size=300x300`;

    return (

        <section className="bg-slate-950 h-auto pt-16 pb-16">
        
            <div className="text-sky-100 flex h-[100px] items-center justify-between text-4xl font-mono title w-9/12 mx-auto mb-16">
                
                <h1>Our Catalogue</h1>

                <Suspense>
                    <Selector />
                </Suspense>

            </div>

            <div className="grid grid-cols-2 gap-5 w-[100%] px-12 mx-auto h-auto">

                <Suspense fallback={<MoleculeListSkeleton numGridItems={6} />}>

                    {data !== undefined ?
                        data.map((thisProduct) => {

                            console.log(thisProduct);
                        
                            return (
                        
                                <MolListItem
                                    key={thisProduct._id}
                                    molName={thisProduct.molName}
                                    CAS={thisProduct.CAS}
                                    description={thisProduct.description}
                                    molSMILES={thisProduct.molSMILES}
                                    tags={thisProduct.tags}
                                    scaffoldID={has(thisProduct, 'scaffold') ? thisProduct.scaffold : false}
                                    inStock={has(thisProduct, 'inStock') ? thisProduct.inStock.value >= 0 : false}
                                />
                            
                            )
                        }) : null
                    }
                    
                </Suspense>

            </div>

        </section>

    )

}

export default ListAllMolecules;
import { PRODUCT_LIST } from "./molecules.productList"
import Selector from "./molecules.classSelector"
import propTypes from "prop-types";
import Link from "next/link"
import { headers } from "next/headers";
import { useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";
import { slugify } from "../utils";
import _ from "lodash";
import SmilesDrawerContainer from './SmilesDrawerContainer';
import { MoleculeBadge } from "./MoleculeBadge";

const getAllMolecules = async () => {

    const res = await fetch(`http://localhost:3000/api/products/`);
    const products = await res.json();

    return products;

};

const MolListItem = ({ key, molName, molSMILES, CAS, description, tags = [], scaffold, inStock = true }) => {

	return (

        <Link
            key={key}
            id={key}
            href={`/molecules/${slugify(molName)}`}
            aria-disabled={!inStock}
            disabled={!inStock}
            >

            <div className={`h-52 w-[100%] flex flex-row transition-all hover:origin-center ${inStock ? 'cursor-pointer hover:scale-[1.025]' : 'opacity-75 cursor-default' } bg-gradient-to-t from-indigo-200 via-blue-200 to-sky-200 rounded-2xl`}>
                <div className='w-52 h-52 flex-shrink-0 rounded-2xl bg-transparent'>
                        <SmilesDrawerContainer
                            SMILES={molSMILES}
                            height={"100%"}
                            width={"100%"}
                            theme="github"
                            className={`w-full h-full p-4 pl-6`} />
                </div>
                <div className='information p-7 flex flex-col'>
                    <h3 className='name whitespace-nowrap text-slate-900 font-mono text-md font-bold'>{molName}</h3>
                    <h4 className='font-mono text-sm mb-2'><b>CAS# </b>{CAS}</h4>
                    
                    <div className="inline-flex mb-2 mr-auto items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-blue-700/30">{scaffold}</div>

                    {tags.forEach((thisTag, index) => (
                        <MoleculeBadge
                            key={index}
                            size={'large'}
                            variation={'info'}
                            className="inline-flex"
                        >{thisTag}</MoleculeBadge>
                    ))}

                    <p className="">{ JSON.stringify(tags, undefined, 3)}</p>
                    
                </div>

            </div>

        </Link>

	)

}

const ListAllMolecules = async ({ request }) => {

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

    if (_.has(searchParams, 'scaffold'))
        filter = { 'scaffold': searchParams.scaffold };
    else
        filter = {};
    
    const { success, data } = await getAllMolecules();

   // const pchem_2d_struct = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${slugify(thisProduct.molName).split('-')[0]}/PNG?record_type=2d&image_size=300x300`;

    return (

        <section className="bg-slate-950 h-auto pt-16 pb-16">
        
            <div className="text-sky-100 flex justify-between text-4xl font-mono title w-9/12 mx-auto mb-16">
                <h1>Our Catalogue</h1>
                <Selector />
            </div>

            <div className="grid grid-cols-2 gap-5 w-[100%] px-12 mx-auto h-auto">

                {data.map((thisProduct) => {
                 
                    console.log(thisProduct);
                    
                    return (
                    
                        <MolListItem
                            key={thisProduct._id}
                            molName={thisProduct.molName}
                            CAS={thisProduct.CAS}
                            description={thisProduct.description}
                            molSMILES={thisProduct.molSMILES}
                            tags={thisProduct.tags}
                            scaffold={_.has(thisProduct, 'scaffold') ? thisProduct.scaffold : false}
                            inStock={_.has(thisProduct, 'inStock') ? thisProduct.inStock[0] : false}
                        />
                        
                    )

                })}

            </div>

        </section>

    )

}

export default ListAllMolecules;
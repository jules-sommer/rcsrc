import { TrashIcon } from "@heroicons/react/24/outline"
import { PRODUCT_LIST } from "./molecules.productList"
import Image from "next/image"
import Selector from "./molecules.classSelector"

const MolListItem = ({ molName, CAS, description, molImg, tags, scaffold }) => {

	return (

		<div className='h-52 w-[100%] flex flex-row transition-all cursor-pointer hover:origin-center hover:scale-[1.025] bg-gradient-to-t from-indigo-200 via-blue-200 to-sky-200 rounded-2xl'>
			<div className='w-52 h-52 flex-shrink-0 rounded-2xl bg-transparent'>
				<Image 
					className='!h-auto !w-auto !relative'
					src={molImg}
					alt={molName}
					fill={true}
				/>
			</div>
			<div className='information p-7 flex flex-col'>
				<h3 className='name whitespace-nowrap text-slate-900 font-mono text-md font-bold'>{molName}</h3>
				<h4 className='font-mono text-sm mb-2'><b>CAS# </b>{CAS}</h4>
                
                <div class="inline-flex mb-2 mr-auto items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-blue-700/30">{scaffold}</div>

                <div>

                    <div className="flex items-center text-md font-mono tracking-tight">
                        <span class="material-icons !text-sm mr-2">radio_button_checked</span>
                        <span>Solution</span>
                    </div>

                    <div className="flex items-center text-md font-mono tracking-tight">
                        <span class="material-icons !text-sm mr-2">radio_button_checked</span>
                        <span>Solution</span>
                    </div>

                </div>
				
			</div>
		</div>

	)

}

const ListAllMolecules = () => {

    return (

        <section className="bg-slate-950 h-auto pt-16 pb-16">
        
            <div className="text-sky-100 flex justify-between text-4xl font-mono title w-9/12 mx-auto mb-16">
                <h1>Our Catalogue</h1>
                <Selector />
            </div>

            <div className="grid grid-cols-2 gap-5 w-[100%] px-12 mx-auto h-auto">

                {PRODUCT_LIST.map( ( thisProduct ) => (
                    
                    <MolListItem
                        molName={thisProduct.molName}
                        CAS={thisProduct.CAS}
                        description={thisProduct.description}
                        molImg={thisProduct.molImg}
                        tags={thisProduct.tags}
                        scaffold={thisProduct.scaffold.name}
                        />

                ))}

            </div>

        </section>

    )

}

export default ListAllMolecules;
import Image from 'next/image';
import { Suspense } from 'react';
import OrderingOptions from './orderingOptions';
import { titleize, slugify } from '../../utils';

import MoleculeInfo from './MoleculeInfo';
import MoleculeInfoSkeleton from './MoleculeInfoSkeleton';

const getProductByName = async (prodName) => {

    console.log(`${Date.now()}: getProductByName("${prodName}") called...`);

    const res = await fetch(`http://localhost:3000/api/products/molName?val=${slugify(prodName)}`);
    const resJSON = await res.json();

	console.log(`${Date.now().toLocaleString('US')}: getProductByName(${prodName}) => ${res}`)

    return resJSON;

};

const MoleculePage = async ({ params }) => {

	MoleculePage.propTypes = {

		params: {
			id: String.isRequired,
		}.isRequired,

	};

	const product = await getProductByName(params.molName);

	console.log('DATA FROM MOLNAME PAGE');
	console.log(product);

	if (product ) {

		// CART ITEM Obj that gets sent down to order configurator
		const cartItem = {
			id: product._id,
			molName: product.molName,
			molImg: product.molImg,
			CAS: product.CAS,
			...product.orderingOptions,
			totalCost: null,
		};
 
		return (

			<section className="bg-slate-950 h-auto pt-16">

				<Suspense fallback={<MoleculeInfoSkeleton />}>
					<MoleculeInfo product={product} />
				</Suspense>

				<div className="py-16 text-sky-100 flex flex-col font-mono mx-16">

					<div className="text-2xl mb-6">Ordering</div>

					{/*
						<OrderingOptions
							id={thisProduct.id}
							molName={thisProduct.molName}
							initialOptions={cartItem}
						/>
					*/}

				</div>

			</section>

		);

	} else {

		return (
		
			<h1>Error: Couldn't find product.</h1>

		)

	}


};

export default MoleculePage;

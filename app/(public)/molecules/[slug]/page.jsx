import Image from 'next/image';
import { Suspense } from 'react';
import OrderingOptions from './orderingOptions';
import { titleize, slugify } from '../../../_utils/utils';
import { useSWR } from 'swr';
import MoleculeInfo from './MoleculeInfo';
import MoleculeInfoSkeleton from './MoleculeInfoSkeleton';
import { getProductBySlug } from '../../../_utils/api';

const MoleculePage = async ({ params }) => {

	MoleculePage.propTypes = {

		params: {
			slug: String.isRequired,
		}.isRequired,

	};

	console.log(slugify(params.slug));

	const { success, message, data } = await getProductBySlug(params.slug);


	if (data) {

		// CART ITEM Obj that gets sent down to order configurator
		const cartItem = {
			id: data._id,
			molName: data.molName,
			CAS: data.CAS,
			...data.orderingOptions,
			totalCost: null,
		};

		return (

			<section className="bg-slate-950 h-auto pt-16">

				<Suspense fallback={<MoleculeInfoSkeleton />}>
					<MoleculeInfo product={data} />
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

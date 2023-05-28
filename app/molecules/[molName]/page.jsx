/* eslint-disable react/react-in-jsx-scope */

'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { PRODUCT_LIST } from '../molecules.productList';
import OrderingOptions from './orderingOptions';

const MoleculePage = ({ params }) => {

	MoleculePage.propTypes = {

		params: {
			id: String.isRequired,
		}.isRequired,

	};

	const thisProduct = PRODUCT_LIST.filter((thisProductInArr) => {

		const thisNormalized = thisProductInArr.molName.trim().replace(/\W+/g, '-').toLowerCase();
		const paramNormalized = params.molName.trim().replace(/\W+/g, '-').toLowerCase();

		return thisNormalized == paramNormalized;

	})[0];

	// CART ITEM Obj that gets sent down to order configurator
	const cartItem = {
		id: thisProduct.id,
		molName: thisProduct.molName,
		molImg: thisProduct.molImg,
		CAS: thisProduct.CAS,
		...thisProduct.orderingOptions,
		totalCost: null,
	};

	useEffect(() => {

		console.log(`CART ITEM: ${JSON.stringify(cartItem, undefined, 4)}`);

	});

	if (thisProduct !== undefined) {

		return (

			<section className="bg-slate-950 h-auto pt-16">

				<div className="flex w-[100%] px-12 mx-auto">

					<div className="w-64 h-64 flex-shrink-0 rounded-2xl inline-flex mr-24 items-center bg-indigo-100 ring-1 ring-inset ring-indigo-600-700/30">
						<Image
							className="!h-auto !w-auto !relative "
							src={thisProduct.molImg}
							alt={thisProduct.molName}
							fill
						/>
					</div>

					<div className="text-sky-100 flex flex-col font-mono title w-9/12 mx-auto mb-8">

						<h1 className="text-4xl">{thisProduct.molName}</h1>

						<span className="my-5">

							<h2 className="text-md text-sky-100/50">
								<b className="text-sky-100/75">CAS#</b>
								{' '}
								{thisProduct.CAS}
							</h2>
							<h2 className="text-md text-sky-100/50">
								<b className="text-sky-100/75">IUPAC:</b>
								{' '}
								{thisProduct.iupac}
							</h2>

						</span>

						<div className="flex flex-row my-5">

							{thisProduct.tags.map((thisTag) => (
								<span className="inline-flex mr-2 items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-blue-700/30">{thisTag}</span>
							))}

						</div>

						<div>

							<p className="font-sans leading-loose my-5 text-lg font-light">{thisProduct.description}</p>

						</div>

					</div>

				</div>

				<div className="py-16 text-sky-100 flex flex-col font-mono mx-16">

					<div className="text-2xl mb-6">Ordering</div>

					<OrderingOptions
						id={thisProduct.id}
						molName={thisProduct.molName}
						initialOptions={cartItem}
					/>

				</div>

			</section>

		);

	}

	return (

		<h1>
			Couldn&apos;t find a product with the id:
			{' '}
			{params.id}
		</h1>

	);

};

export default MoleculePage;

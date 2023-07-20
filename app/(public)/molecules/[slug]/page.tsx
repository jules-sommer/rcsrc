import { Suspense } from 'react';
import { titleize, slugify } from '../../../_utils/utils';
import MoleculeInfo from './MoleculeInfo';
import MoleculeInfoSkeleton from './MoleculeInfoSkeleton';
import { getProductByName } from '../../../_utils/dbUtils';
import { getProductBySlug } from '../../../_utils/api';
import OrderConfigurator from './OrderConfigurator';

const MoleculePage = async ({ params }) => {

	console.log(slugify(params.slug));

	const { success, product } = await getProductBySlug(slugify(params.slug));

  console.log(product)

	if (product) {

		return (

			<section className="bg-slate-950 h-auto pt-16">

				<Suspense fallback={<MoleculeInfoSkeleton />}>
					<MoleculeInfo product={product} />
				</Suspense>

				<div className="py-16 text-sky-100 flex flex-col font-mono mx-16">

					<h1 className="text-3xl mb-10">Ordering</h1>

					<div className="flex flex-col w-full border-opacity-50 mb-10">
						<div className="divider">Order Now</div>
					</div>

					<OrderConfigurator product={product} />

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

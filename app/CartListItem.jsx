/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable arrow-body-style */

import Image from 'next/image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const QuantityDisplay = ({ type, value, unit }) => {

	const volume = value.qty / value.concentration;

	if (type) {

		return (

			<div className="flex flex-row row-span-2 drop-shadow-md ">

				<span>

					<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{value.qty} {unit.qty} @ {value.concentration} {unit.concentration} [{volume}mL]</span>

				</span>

			</div>

		);

	}

	return (

		<div className='row-span-4'>

			<span className="px-3 py-5">{value}</span>
			<span className="px-3 py-5">{unit}</span>

		</div>

	);

};

const CartListItem = ({ cartItemObj }) => {

	console.log(`thisCartItem: ${cartItemObj} ( from cartListItem.jsx )`);

	const isSolution = cartItemObj.format.selected === 'Solution';

	return (

		<div className="!min-h-[75px] grid flex-grow-0 border-2 border-violet-400 rounded-2xl bg-slate-200 ">

			<div className="col-span-1 row-span-4 row-start-1 w-[75px] h-[75px] relative rounded-full overflow-hidden bg-slate-100">

				<Image
					className="rounded-full bg-slate-300 stroke-slate-700 stroke-2 relative top-0 bottom-0 left-0 right-0"
					src={cartItemObj.molImg}
					fill
				/>

			</div>

			<div className="col-span-2 row-span-1 row-start-0 row-end-2 flex flex-col items-start flex-grow-0 justify-center">

				<h1 className="font-mono font-bold">{cartItemObj.molName} {cartItemObj.format.selected}</h1>
				<p className="font-mono">
					CAS#
					{' '}
					{cartItemObj.CAS}
				</p>

			</div>

			{/* quantity of substance / amount of solute = concentration */}

			<div className="col-span-2 row-span-1 row-start-3 col-start-2 row-end-4">
				<QuantityDisplay
					type={isSolution}
					value={isSolution
						? { qty: cartItemObj.quantities.values[cartItemObj.quantities.selected], concentration: cartItemObj.concentrations.values[cartItemObj.concentrations.selected] }
						: cartItemObj.quantities.selected}
					unit={isSolution
						? { concentration: cartItemObj.concentrations.unit, qty: cartItemObj.quantities.unit } 
						: cartItemObj.quantites.selected}
				/>
			</div>

			<div className="col-span-1 row-span-1 row-start-3 col-start-3">
				<DeleteForeverIcon className="hover:cursor-pointer" />
			</div>

			<div className="col-span-1 row-span-1 row-start-1 col-start-4">
				<p>${cartItemObj.totalCost} CAD</p>
			</div>

		</div>

	);

};

export default CartListItem;

/* eslint-disable no-nested-ternary */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-fallthrough */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

'use client';

import { RadioGroup, Switch, Tab } from '@headlessui/react';
import {
	useState, useReducer, useContext, useMemo, useEffect,
} from 'react';
import { CartDispatchContext, CartStateContext } from '../../../_providers/cartProvider';
import PropTypes from 'prop-types';
import Formatter from '../../../_utils/moneyFormatter';
import { useParams } from 'next/navigation';

function classNames(...classes) {

	return classes.filter(Boolean).join(' ');

}

const FormatsNote = () => (
	<>
		<b>Note:</b>
		{' '}
		{process.env.NEXT_PUBLIC_FORMATS_NOTE}
	</>
);

const FormatSelector = ({ formats, dispatch, onSelect, setFormatSelected }) => {

	const { selected } = formats;

	const handleClick = (e) => {

		console.log(e.target.name);

		// check if on select is provided and if it is a function, if so, call it
		if( typeof onSelect === 'function' && onSelect !== undefined )
			onSelect();

		const res = dispatch({ type: 'update_format', newFormat: e.target.name });

		console.log(res);

	};

	return (

		<div className="min-w-full">

			<h4 className="text-lg">Choose a format to get started:</h4>

			<div className="flex my-5">

				{formats.options.map((thisFormat, index) => (
					<button
						id={index}
						type="button"
						onClick={handleClick}
						name={thisFormat}
						isSelected={thisFormat == selected}
						className={`border-sky-300 border-l-2 border-y-2 grow p-4 first-of-type:rounded-l-lg last-of-type:rounded-r-lg last-of-type:border-r-2  ${thisFormat == selected ? 'bg-sky-900' : 'bg-transparent hover:bg-sky-500/10'}`}
					>
						{thisFormat}
					</button>
				))}

			</div>

			<p className="text-white/50 text-sm">
				<FormatsNote />
			</p>

		</div>

	);

};

const EmptyStateBeforeFormatSelect = () => {

	return (

		<div className="flex flex-col h-full row-span-6 animate-pulse">

			<span class="w-3/12 bg-slate-600/25 h-4 rounded-md my-2" />
			<span class="w-4/5 bg-slate-600/25 h-4 rounded-md my-2" />

			<div className="flex flex-grow h-auto flex-col mt-5 justify-between">

				<span class="w-[100%] bg-slate-600/10 h-auto grow rounded-md my-2" />
				<span class="w-[100%] bg-slate-600/10 h-auto grow rounded-md my-2" />
				<span class="w-[100%] bg-slate-600/10 h-auto grow rounded-md my-2" />

			</div>

			<div className="flex flex-grow h-auto flex-col mt-5 justify-between">

				<span class="w-[75%] bg-slate-600/10 h-auto grow rounded-md my-2" />
				<span class="w-[75%] bg-slate-600/10 h-auto grow rounded-md my-2" />
				<span class="w-[75%] bg-slate-600/10 h-auto grow rounded-md my-2" />

			</div>

		</div>

	);

}

/** TO-DO: MAKE THIS COMPONENT SHARED BETWEEN BOTH POWER AND SOLUTION STATES FOR EFFICIENCY'S SAKE */
const ContainerSelector = ({ options, dispatch }) => {

	if (options.format.selected !== false && options.format.selected !== undefined) {

		return (

			<div className="flex my-5 grow w-[100%]">

				{/* eslint-disable-next-line no-undef */}
				<RadioGroup value={container} onChange={handleContainerChange} className="w-auto grow">
					<RadioGroup.Label>
						Choose a container for your
						{' '}
						{options.format.selected !== false ? options.format.selected.toLowerCase() : false}
						:
					</RadioGroup.Label>
					{options.containers.options.map((thisContainer, index) => (
						<RadioGroup.Option
							key={thisContainer.id}
							value={thisContainer}
							className="ui-active:bg-sky-800 ui-active:border-2 ui-active:border-sky-400 ui-active:text-white
                                ui-not-active:bg-white/10 ui-not-active:text-white/50 ui-not-active:border-2 ui-not-active:border-slate-600
                                    p-5 rounded-md mb-5 flex flex-row items-center grow first-of-type:mt-5 last-of-type:mb-0"
						>
							<span className="material-symbols-rounded">check</span>
							<span className="whitespace-pre-line">{thisContainer.name}</span>
						</RadioGroup.Option>
					))}
				</RadioGroup>

			</div>

		);

	}

	// this is the default return if no format is selected
	return <EmptyStateBeforeFormatSelect />;

};

const TabWrapper = ({ num, text }) => (

	<Tab
		className=" py-3 rounded-full grow ml-5 first-of-type:ml-0 px-2.5 ui-selected:bg-sky-900
                        flex flex-row hover:text-white"
	>

		<span
			className="mr-2 rounded-full flex items-center justify-center bg-sky-400 w-6 h-6"
		>
			{num}
		</span>

		<span class="material-symbols-rounded shrink-0 w-6 h-6 mr-3">double_arrow</span>
		<span className="transition-all hover:translate-y-[-2px]">{text}</span>

	</Tab>

);

const PowderComposition = ({ options, dispatch }) => {

	const format = options.format.selected;
	const container = options.containers[options.containers.selected];
	const selectedQuantity = options.quantities.values[options.quantities.selected];

	const handleQuantityChange = (e) => {

		console.log(`ID: ${e.target.id} corresponds to ${options.quantities.values[e.target.id]} ${options.quantities.unit}`);

		const res = dispatch({ type: 'update_quantity', ID: Number(e.target.id) });

		console.log(res);

	};

	const handleContainerChange = (e) => {

		console.log(e);
		const res = dispatch({ type: 'update_container', selected: e });
		console.log(res);

	};

	return (

		<Tab.Group>

			<Tab.List className="col-span-4 flex justify-between mb-10">
				<TabWrapper num={1} text="Properties" />
				<TabWrapper num={2} text="Container" />
			</Tab.List>

			<Tab.Panels className="col-span-4 row-auto">

				<Tab.Panel>

					<div className="flex my-5 flex-col w-[100%] justify-center">

						<h4 className="text-lg grow-0 mb-4">
							Select quantity:
							{' '}
							{selectedQuantity}
							{' '}
							{options.quantities.unit}
						</h4>

						<div className="flex flex-row">

							{options.quantities.values.map((thisQty, index) => (
								<button
									id={index}
									type="button"
									onClick={handleQuantityChange}
									name={thisQty}
									isSelected={index == options.quantities.selected}
									className={`border-sky-300 border-l-2 border-y-2 last-of-type:border-r-2 text-lg min-h-[60px] grow p-2 first-of-type:rounded-l-lg last-of-type:rounded-r-lg hover:bg-sky-500/25
                                                ${index == options.quantities.selected ? 'bg-sky-900 hover:bg-sky-900' : 'bg-transparent'}`}
								>
									{thisQty}
									{' '}
									{options.quantities.unit}
								</button>
							))}

						</div>

					</div>

				</Tab.Panel>

				<Tab.Panel>

					<RadioGroup value={container} by="id" onChange={handleContainerChange} className="w-auto grow">
						<RadioGroup.Label>
							Choose a container for your
							{' '}
							{options.format.selected !== false ? options.format.selected.toLowerCase() : false}
							:
						</RadioGroup.Label>
						<RadioGroup.Label className="block my-2 mb-10 text-white/40 text-sm">There is a maximum volume we can accommodate in each style of container; therefore, if your solution or powder volume exceeds that of the max. volume of your selected container, we will split the order into multiple containers at no additional cost, within reason.</RadioGroup.Label>

						<div className="grid grid-cols-2 gap-4 grid-flow-row">
							{options.containers.options.map((thisContainer, index) => (
								<RadioGroup.Option
									key={thisContainer.id}
									value={thisContainer}
									className="ui-active:bg-sky-800 ui-active:border-2 ui-active:border-sky-400 ui-active:text-white
                            ui-checked:!bg-sky-800 ui-checked:!border-2 ui-checked:!border-sky-400 ui-checked:!text-white ui
                                    ui-not-active:bg-white/10 ui-not-active:text-white/50 ui-not-active:border-2 ui-not-active:border-slate-600
                                        rounded-md flex flex-col items-center grow last-of-type:mb-0"
								>

									<div className="flex p-5 w-full text-sm justify-between border-b-2 border-slate-700 ui-active:border-sky-400 ui-checked:border-sky-400">
										<span className="material-symbols-rounded">check</span>
										<span className="whitespace-pre-line">{thisContainer.name}</span>
									</div>

									<div className="flex flex-col items-end w-full text-sm p-2">
										<span className="flex justify-self-end px-2 py-1">
											Max. Volume:
											{' '}
											{thisContainer.maxVol}
											{' '}
											mL
										</span>
										<span className="flex justify-self-end px-2 py-1">{thisContainer.top}</span>
										<span className="flex justify-self-end px-2 py-1">{thisContainer.septa}</span>
									</div>
									<div className="flex flex-col items-end w-full text-sm p-2 border-t-2 border-slate-700 ui-active:border-sky-400 ui-checked:border-sky-400">
										<span className="flex justify-self-end px-2 py-1">
											+ [$
											{thisContainer.costAdd}
											]
										</span>
									</div>
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>

				</Tab.Panel>

			</Tab.Panels>

		</Tab.Group>

	);

};

const SolutionComposition = ({ options, dispatch }) => {

	const { isSterile, addPreservative } = options;
	const format = options.format.selected;

	// eslint-disable-next-line no-unused-vars
	const solvent = options.solvents.selected;
	const container = options.containers.selected;
	const selectedConcentration = options.concentrations.values[options.concentrations.selected];
	const selectedQuantity = options.quantities.values[options.quantities.selected];

	const totalVolume = selectedQuantity / selectedConcentration;

	const [selectedIndex, setSelectedIndex] = useState(0);

	// TO-DO: make a custom button component with a custom eventHandler that takes in the event and the type of action to dispatch and any custom args

	const handleDispatch = (e, type) => {

		const res = dispatch({ type, selected: e });

		console.log(res);

	};

	const handleToggleSterility = (e) => {

		const res = dispatch({ type: 'toggle_sterility' });

		console.log(res);

	};

	const handleTogglePreservative = (e) => {

		const res = dispatch({ type: 'toggle_preservative' });

		console.log(res);

	};

	const handleConcentrationClick = (e) => {

		console.log(`ID: ${e.target.id} corresponds to ${options.concentrations.values[e.target.id]} ${options.concentrations.unit}`);

		const res = dispatch({ type: 'update_concentration', ID: Number(e.target.id) });

		console.log(res);

	};

	const handleQuantityChange = (e) => {

		console.log(`ID: ${e.target.id} corresponds to ${options.quantities.values[e.target.id]} ${options.quantities.unit}`);

		const res = dispatch({ type: 'update_quantity', ID: Number(e.target.id) });

		console.log(res);

	};

	const handleSolventChange = (e) => {

		console.log(e);
		const res = dispatch({ type: 'update_solvent', selected: e });

		console.log(res);

	};

	const handleContainerChange = (e) => {

		console.log(`CONTAINER CHANGE @ handleContainerChange(): ${JSON.stringify(e, undefined, 4)} `);
		const res = dispatch({ type: 'update_container', selected: e });
		console.log(res);

	};

	return (

		<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>

			<Tab.List className="col-span-4 flex justify-between mb-10">
				<TabWrapper num={1} text="Properties" />
				<TabWrapper num={2} text="Composition" />
				<TabWrapper num={3} text="Container" />
			</Tab.List>

			<Tab.Panels className="col-span-4 row-auto">

				<Tab.Panel className="col-span-4 row-auto">

					<div className="min-w-full col-span-4">

						<h4 className="text-lg">Your solution requirements:</h4>

						<div className="flex my-5 items-end">

							<Switch
								checked={isSterile}
								onChange={handleToggleSterility}
								className={`${
									isSterile ? 'bg-blue-600' : 'bg-slate-400'
								} relative inline-flex h-6 w-11 items-center rounded-full`}
							>
								<span className="absolute w-auto !text-md whitespace-nowrap left-16">Sterile solution? ( 0.22μm sterile filtered ) +[$7.50]</span>
								<span
									className={`${
										isSterile ? 'translate-x-6' : 'translate-x-1'
									} inline-block h-4 w-4 transform rounded-full bg-white transition`}
								/>
							</Switch>

						</div>

						<div className="flex my-5">

							<Switch
								checked={addPreservative}
								onChange={handleTogglePreservative}
								className={`${
									addPreservative ? 'bg-blue-600' : 'bg-slate-400'
								} relative inline-flex h-6 w-11 items-center rounded-full`}
							>
								<span className="absolute w-auto !text-md whitespace-nowrap left-16">Add preservative? ( 1.5% benzyl alcohol ) +[$0.50]</span>
								<span
									className={`${
										addPreservative ? 'translate-x-6' : 'translate-x-1'
									} inline-block h-4 w-4 transform rounded-full bg-white transition`}
								/>
							</Switch>

						</div>

						<div className="flex my-5 flex-col w-[100%] justify-center mt-10 border-t-sky-200/25 border-t-2 pt-10">

							<h4 className="text-lg grow-0 mb-4">
								Concentration:
								{' '}
								{selectedConcentration}
								{' '}
								{options.concentrations.unit}
							</h4>

							<div className="flex flex-row">

								{options.concentrations.values.map((thisValue, index) => (
									<button
										id={index}
										type="button"
										onClick={handleConcentrationClick}
										name={thisValue}
										isSelected={index === options.concentrations.selected}
										className={`border-sky-300 border-l-2 border-y-2 last-of-type:border-r-2 text-lg min-h-[60px] grow p-2 first-of-type:rounded-l-lg last-of-type:rounded-r-lg hover:bg-sky-500/25
                                                    ${index === options.concentrations.selected ? 'bg-sky-900 hover:bg-sky-900' : 'bg-transparent'}`}
									>
										{thisValue}
										{' '}
										{options.concentrations.unit}
									</button>
								))}

							</div>

						</div>

						<div className="flex my-5 flex-col w-[100%] justify-center">

							<h4 className="text-lg grow-0 mb-4">
								Total solute:
								{' '}
								{selectedQuantity}
								{' '}
								{options.quantities.unit}
							</h4>

							<div className="flex flex-row">

								{options.quantities.values.map((thisQty, index) => (
									<button
										id={index}
										type="button"
										onClick={handleQuantityChange}
										name={thisQty}
										isSelected={index == options.quantities.selected}
										className={`border-sky-300 border-l-2 border-y-2 last-of-type:border-r-2 text-lg min-h-[60px] grow p-2 first-of-type:rounded-l-lg last-of-type:rounded-r-lg hover:bg-sky-500/25
                                                    ${index == options.quantities.selected ? 'bg-sky-900 hover:bg-sky-900' : 'bg-transparent'}`}
									>
										{thisQty}
										{' '}
										{options.quantities.unit}
									</button>
								))}

							</div>

							<h4 className="text-lg grow-0 mt-4 text-slate-400/50">
								Your solution will have a volume of
								{' '}
								{totalVolume}
								{' '}
								mL
							</h4>

						</div>

					</div>

				</Tab.Panel>

				<Tab.Panel>

					<div className="min-w-full col-span-4 row-span-1">

						<div className="flex my-5">

							<RadioGroup value={options.solvents.selected} by="id" onChange={handleSolventChange} className="flex flex-col grow w-auto">
								<RadioGroup.Label>
									Choose a solvent / carrier for your
									{' '}
									{format.toLowerCase()}
									:
								</RadioGroup.Label>
								{options.solvents.options.map((thisSolvent, index) => (
									<RadioGroup.Option
										key={thisSolvent.id}
										value={thisSolvent}
										className="ui-active:bg-sky-800 ui-active:border-2 ui-active:border-sky-400 ui-active:text-white
                                            ui-checked:!bg-sky-800 ui-checked:!border-2 ui-checked:!border-sky-400 ui-checked:!text-white
                                            ui-not-active:bg-white/10 ui-not-active:text-white/50 ui-not-active:border-2 ui-not-active:border-slate-600
                                                p-5 rounded-md mb-5 w-[100%] grow flex flex-row items-center first-of-type:mt-5 last-of-type:mb-0"
									>
										<span className="material-symbols-rounded">check</span>
										<span className="whitespace-pre-line">{thisSolvent.name}</span>
									</RadioGroup.Option>
								))}
							</RadioGroup>

						</div>

					</div>

				</Tab.Panel>

				<Tab.Panel className="col-span-4 row-auto">

					<RadioGroup value={container} by="id" onChange={handleContainerChange} className="w-auto grow">
						<RadioGroup.Label>
							Choose a container for your
							{' '}
							{options.format.selected !== false ? options.format.selected.toLowerCase() : false}
							:
						</RadioGroup.Label>
						<RadioGroup.Label className="block my-2 mb-10 text-white/40 text-sm">There is a maximum volume we can accommodate in each style of container; therefore, if your solution or powder volume exceeds that of the max. volume of your selected container, we will split the order into multiple containers at no additional cost, within reason.</RadioGroup.Label>

						<div className="grid grid-cols-2 gap-4 grid-flow-row">
							{options.containers.options.map((thisContainer, index) => (
								<RadioGroup.Option
									key={thisContainer.id}
									value={thisContainer}
									className="ui-active:bg-sky-800 ui-active:border-2 ui-active:border-sky-400 ui-active:text-white
                            ui-checked:!bg-sky-800 ui-checked:!border-2 ui-checked:!border-sky-400 ui-checked:!text-white ui
                                    ui-not-active:bg-white/10 ui-not-active:text-white/50 ui-not-active:border-2 ui-not-active:border-slate-600
                                        rounded-md flex flex-col items-center grow last-of-type:mb-0"
								>

									<div className="flex p-5 w-full text-sm justify-between border-b-2 border-slate-700 ui-active:border-sky-400 ui-checked:border-sky-400">
										<span className="material-symbols-rounded">check</span>
										<span className="whitespace-pre-line">{thisContainer.name}</span>
									</div>

									<div className="flex flex-col items-end w-full text-sm p-2">
										<span className="flex justify-self-end px-2 py-1">
											Max. Volume:
											{' '}
											{thisContainer.maxVol}
											{' '}
											mL
										</span>
										<span className="flex justify-self-end px-2 py-1">{thisContainer.top}</span>
										<span className="flex justify-self-end px-2 py-1">{thisContainer.septa}</span>
									</div>
									<div className="flex flex-col items-end w-full text-sm p-2 border-t-2 border-slate-700 ui-active:border-sky-400 ui-checked:border-sky-400">
										<span className="flex justify-self-end px-2 py-1">
											+ [$
											{thisContainer.costAdd}
											]
										</span>
									</div>
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>

				</Tab.Panel>

			</Tab.Panels>

		</Tab.Group>

	);

};

const optionsReducer = (state, action) => {

	const isSolution = !!((state.format.options.includes('Solution') && state.format.selected == 'Solution'));
	const container = action.selected;

	switch (action.type) {

	case 'update_format':

		if (action.newFormat !== state.format.selected) {

			return {
				...state,
				format: {
					...state.format,
					selected: action.newFormat,
				},
			};

		}

		return { ...state };

	case 'toggle_sterility':

		if (isSolution) {

			if (state.isSterile == false) return { ...state, isSterile: true };
			return { ...state, isSterile: false };

		}

	case 'toggle_preservative':

		if (isSolution) {

			if (state.addPreservative == false) return { ...state, addPreservative: true };
			return { ...state, addPreservative: false };

		}

	case 'update_solvent':

		if (isSolution && action.selected !== undefined) {

			return {

				...state,
				solvents: {
					...state.solvents,
					selected: action.selected,
				},

			};

		}

		return { ...state };

	case 'update_container':

		return {

			...state,
			containers: {
				...state.containers,
				selected: container,
			},

		};

	case 'update_concentration':

		if (state.concentrations !== undefined && isSolution) {

			const concentrationID = action.ID;

			return {
				...state,
				concentrations: {
					...state.concentrations,
					selected: concentrationID,
				},
			};

		}

		return { ...state };

	case 'update_quantity':

		if (state.quantities !== undefined) {

			const quantityID = action.ID;

			return {
				...state,
				quantities: {
					...state.quantities,
					selected: quantityID,
				},
			};

		}

		return { ...state };

	case 'update_total_cost':

		if (!action.newCost)
			return { ...state };

		if (action.newCost !== state.totalCost || typeof (action.newCost) !== 'number') {

			return {
				...state,
				totalCost: action.newCost,
			};

		}

		break;

	default:
		return state;

	}

	return false;

};

const Alert = ({
	title, description, type, actions = null, isAlertVisible,
}) => {
	
	// TO-DO: define prop types for this component

	Alert.propTypes = {
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		actions: PropTypes.array,
		isAlertVisible: PropTypes.bool.isRequired,
	};

	let fontColour;
	let borderColour;

	switch (type) {
	
		case 'warning':
			fontColour = 'text-rose-400';
			borderColour = 'border-rose-500';
				break;
			
		case 'success':
			fontColour = 'text-lime-400';
			borderColour = 'border-lime-500';
				break;
			
		case 'failure':
			fontColour = 'text-red-400';
			borderColour = 'border-red-500';
			break;
		
		default:
			fontColour = 'text-sky-400';
			borderColour = 'border-sky-500';
			break;

	}

	if (isAlertVisible) {

		return (

			<div className={`flex flex-col w-full h-full items-start p-5 justify-center border-2 rounded-2xl ${borderColour}`}>

				<h1 className={`font-semibold text-md mb-3 ${fontColour}`}>{title}</h1>
				<p className={`font-thin text-sm ${fontColour} opacity-75`}>{description}</p>

			</div>

		);
	
	} else {

		console.error("No prop passed for isAlertVisible returning null");
		return null;

	}

};

const OrderingOptions = ({ id, molName, initialOptions }) => {

	const { costFunction } = initialOptions;
	const [options, dispatch] = useReducer(optionsReducer, initialOptions);

	const cartState = useContext(CartStateContext);
	const cartDispatch = useContext(CartDispatchContext);

	const [alert, setAlert] = useState(false);

	// create a state for whether a format has been selected
	// this state will either be false, indicating no format has been selected, or it will be the format that has been selected
	// the setFormatSelected function will be passed down to the format selector component, and will be called when a format is selected
	const [formatSelected, setFormatSelected] = useState(false);

	const { totalCost: _, ...optionsNoTotal } = options;

	console.log(optionsNoTotal);
	console.log(options);

	const updateTotal = useMemo(() => {

		console.log('options has changed.... updating cost....');
		if (costFunction(options) !== options.totalCost) { dispatch({ type: 'update_total_cost', newCost: costFunction(options) }); }

	}, [optionsNoTotal]);

	const AddToCartButton = ({ formatSelected, costFunction, options }) => {

		AddToCartButton.PropTypes = {
			formatSelected: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.bool
			]).isRequired,
			costFunction: PropTypes.func.isRequired,
			options: PropTypes.object.isRequired,
		}

		// options will create an infinite loop if we don't remove the totalCost property from the options object
		// we can do this by destructuring the options object and removing the totalCost property
		// this should be done in a local state, so that we don't mutate the original options object

		const { totalCost: _, ...optionsNoTotal } = options;

		// Create a local state to hold the cost of the current configuration using the props passed to this component		
		const [costOfCurrentConfig, setCostOfCurrentConfig] = useState(0);

		// listen to state to determine if config has changed, if it has, then update the costOfCurrentConfig state
		useEffect(() => {

			const newCost = costFunction(options);

			if (newCost !== costOfCurrentConfig) setCostOfCurrentConfig(newCost);
			else console.log('costOfCurrentConfig is the same as the new cost, not updating');

		}, [optionsNoTotal]);

		if (formatSelected !== false) {

			return (

				<div className="flex justify-end">
					<span className="font-mono px-3 py-2 m-2 mr-0 rounded-l-full border-sky-600 border-2 text-md min-h-[40px] block">
						
						{/* using currency formatter function in project root, format cart state context and avoid calling costFunction every time here */}
						{Formatter.format(costOfCurrentConfig)}
					</span>

					<button
						type="submit"
						className="font-mono px-3 py-2 m-2 ml-0 rounded-r-full bg-gradient-to-tl from-sky-600 to-indigo-500 text-md min-h-[40px] block"
						onClick={() => {
							
							try {
								addConfigToCart();
							} catch(e) {
								console.log(e);
								setAlert({ title: 'Please select all options!', type: 'warning', description: 'Please select all options before adding to cart!' });
							}
						
						}}>
						Add to Cart
					</button>
				</div>

			)
		}

	} 

	const addConfigToCart = () => {

		console.log(`OPTIONS FROM addConfigToCart: ${JSON.stringify(options)}`);

		const unselectedVals = [];

		for (const [index, thisOption] of Object.entries(options)) {

			const thisOptionDataType = typeof (thisOption);

			if (thisOptionDataType === 'object') {

				console.log(`We're adding ${JSON.stringify(thisOption, undefined, 2)} to CART at this index: ${index}`);

				{/* 
					We need to check if the option has a property called 'selected' and if it does, then we need to check if it's true or false
					If it's false, then we need to add the index to the unselectedVals array

				*/}

				if (Object.hasOwn(thisOption, 'selected')) {

					// This option for product has to be data validated i.e if there is an option selected, then it's okay to add.
					console.log(`${index} has property that needs to be selected`);

					if (thisOption.selected === false) unselectedVals.push(index);

				}

			}

		}

		if (unselectedVals.length !== 0) {

			console.log(JSON.stringify(unselectedVals, undefined, 2));
			
			throw new Error('Please select all options before adding to cart!');			

		}

		// try to dispatch new item to cart, if it fails, then we know that the item is already in the cart, so we can just update the quantity of the item in the cart.

		try {
			cartDispatch({ type: 'ADD_TO_CART', cartItem: { id: id, ...options } });
			cartDispatch({ type: 'UPDATE_CART_TOTAL', operator: 'ADD', value: parseFloat(options.totalCost) });
		} catch (e) {
			
			console.log(e);
			console.log('ITEM ALREADY IN CART, UPDATING QUANTITY INSTEAD');

			// update alert state to show user that the item is already in the cart and that we're updating the quantity instead of adding a new item to the cart.
			setAlert({ title: 'Item already in cart!', type: 'warning', description: 'This item is already in your cart, we\'re updating the quantity instead of adding a new item to the cart!' });
			return true;

		}

		// ADD TO CART
		setAlert({ title: 'Thank you!', type: 'success', description: 'Your item has been added to cart, you can continue shopping or checkout now!!' });
		return true;

	};

	return (

		<>

			<div className="grid grid-cols-7 grid-rows-10 gap-x-16 gap-y-8 bg-sky-700/10 p-10 rounded-xl">

				<div className="col-span-3 row-span-3">
					<FormatSelector
						formats={options.format}
						dispatch={dispatch}
						onSelect={() => {
							setFormatSelected(true);
						}}
						setFormatSelected
					/>
				</div>

				<div className="col-span-4 row-span-6">

					{(!options.format.selected) ? (

						// this is the empty state for when no format has been selected
						<EmptyStateBeforeFormatSelect />
					
					) : options.format.selected == 'Solution' ? (

						<SolutionComposition className="" options={options} dispatch={dispatch} />

					) : (

						<PowderComposition className="" options={options} dispatch={dispatch} />

					)}

				</div>

				<div className="col-span-3 font-mono row-span-auto">

					<Alert
						title={alert.title}
						type={alert.type}
						description={alert.description}
						isAlertVisible={alert}
					/>

				</div>
				
				<div className="col-span-3 font-mono row-span-3 p-5 rounded-2xl bg-gradient-to-tl from-sky-950 to-indigo-950">
					
					<h1 className="font-semibold text-lg">
						{molName}
						{' '}
						{options.format.selected}
					</h1>
					
					{options.format.selected == 'Solution' ? (
					
						<>
							
							<div>
								<span className="flex items-center text-white/50 my-2">
									<span class="material-symbols-rounded h-4 w-4 mx-3">double_arrow</span>
									{options.isSterile ? 'Sterile' : 'Non-Sterile'}
								</span>
								<span className="flex items-center text-white/50 my-2">
								<span class="material-symbols-rounded h-4 w-4 mx-3">double_arrow</span>
									{options.addPreservative ? 'w/ Preservative' : 'w/o Preservative'}
								</span>

								{options.solvents.selected ? (
									<span className="flex items-start justify-start text-white/50 my-2">
										<span class="material-symbols-rounded h-4 w-4 mx-3 shrink-0">double_arrow</span>
										{options.solvents.selected.name}
									</span>
								) : null }

								{options.containers.selected ? (
									<span className="flex items-center text-white/50 my-2">
										<span class="material-symbols-rounded h-4 w-4 mx-3 shrink-0">double_arrow</span>
										{options.containers.selected.shortHand}
									</span>
								) : null }

								<span className="flex items-center text-white/50 my-2">
									<span class="material-symbols-rounded h-4 w-4 mx-3">double_arrow</span>
									{options.quantities.selected !== false ? `${options.quantities.values[options.quantities.selected]} ${options.quantities.unit}` : false }
								</span>
							
							</div>

						</>

					) : null }
					
					{ /* Powder, only shown if format is selected, i.e not false, and its value is equal to powder */ }
					{options.format.selected == 'Powder' ? (

						<>

							<span className="flex items-center text-white/50">
								<span class="material-symbols-rounded h-4 w-4 mx-3">double_arrow</span>
								{options.quantities.selected !== false ? `${options.quantities.values[options.quantities.selected]} ${options.quantities.unit}` : false }
							</span>

							{options.containers.selected ? (
								<span className="flex items-center text-white/50">
									<span class="material-symbols-rounded h-4 w-4 mx-3">double_arrow</span>
									{options.containers.selected.shortHand}
									</span>
							) : null }
									
						</>
		
					) : null }

					{/* AddToCartButton has own state to determine if it should be shown */}			
					
					<AddToCartButton
						formatSelected={formatSelected}
						costFunction={costFunction}
						options={options}
							/>								
						
					</div>
		
			</div>

			<span>
				Length:
				{' '}
				{Object.keys(options).length}
			</span>

			<pre className="text-clip overflow-hidden">{JSON.stringify(options, undefined, 4)}</pre>

		</>

	);

};

export default OrderingOptions;

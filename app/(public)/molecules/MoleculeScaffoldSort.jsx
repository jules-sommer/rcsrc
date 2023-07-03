"use client"

import { Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'
import { Loader, SelectField } from '@aws-amplify/ui-react'
import { slugify } from '../../_utils/utils'
import { useRouter } from 'next/navigation'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

let numRenders = 0;

export const Selector = () => {

	const router = useRouter();

	const { data, error, isLoading } = useSWR(`/api/scaffold`, fetcher);

	const [scaffolds, setScaffolds] = useState([]);
	const [selected, setSelected] = useState();

	numRenders++;

	if(data && !isLoading && !error)
		console.log(JSON.stringify(data, undefined, 4));

	useEffect(() => {

		if (!isLoading && !error) {
			
			console.log(JSON.stringify(data, undefined, 4));

			if(data.data.length > 0)
				setScaffolds(data.data);
			
			if(scaffolds.length > 0)
				setSelected(scaffolds[0]._id)

			console.log('scaffolds:');
			console.log(JSON.stringify(scaffolds, undefined, 4));

		} else {

			console.log(`isLoading: ${isLoading}`)
			console.log(`error: ${JSON.stringify(error)}`)

		}
		
	}, [isLoading, data, error]);

	const [selectedScaffold, setSelectedScaffold] = useState(scaffolds[0])
	const [query, setQuery] = useState('All Scaffolds')
	
	const filteredScaffolds =
		query === 'All'
		? scaffolds
		: scaffolds.filter((scaffold) => {
			return scaffold.iupac.toLowerCase().includes(query.toLowerCase())
			})

	const updateScaffoldQuery = (scaffold) => {

		const sluggedScaffold = slugify(scaffold);

		console.log(sluggedScaffold);

		const scaffoldArr = scaffolds.filter((scaffold) => {
									if (slugify(scaffold.iupac) === sluggedScaffold)
										return scaffold;
									else
										return null;
									})
		
		if (scaffoldArr.length !== 1) {
			console.log('Error: scaffoldArr.length !== 1');
		} else {
			setQuery(scaffoldArr[0]._id)
			router.push(`/molecules?id=${scaffoldArr[0]._id}`)
		}

		console.log(query);

	}
	
	if (isLoading || error)
		return <div className='h-full flex flex-col items-center justify-center'><Loader size='large' /></div>

	if (error)
		console.log(JSON.stringify(error));
	
	return (

		<div className='flex flex-col w-72 h-10'>

			<p className='text-sm mb-3 text-sky-300 font-mono'>Sort by molecular scaffold:</p>
			
			<SelectField
				label="Scaffold Sort"
				size='default'
				variation="default"
				labelHidden={true}
				descriptiveText="Sort by molecular scaffold:"
				placeholder={'All Scaffolds'}
				onChange={(event) => updateScaffoldQuery(event.target.value)}
				className='focus:!border-sky-300 active:!border-sky-300 bg-slate-950'
			>
				{scaffolds.map((scaffold) => (
					<option
						key={scaffold._id}
						value={scaffold.iupac}
						className='bg-indigo-950 text-sky-100 font-mono'
					>
						<p className='text-sm font-mono'>{scaffold.iupac}</p>
					</option>
				))}
			</SelectField>
{/*
			<Combobox
				value={selectedScaffold}
				onChange={setSelectedScaffold}
				as='div'
				className='w-full rounded-md z-10 p-1'
			>
				
				<Combobox.Input
					as='input'
					className='w-full rounded-md !bg-indigo-950 text-sky-100 font-mono focus:outline-none focus:ring focus:ring-offset-2 ring-offset-transparent focus:ring-indigo-500 focus:border-transparent'
					onChange={(event) => setQuery(event.target.value)} />

				<Combobox.Options className={'bg-indigo-800 shadow-md shadow-black rounded-md text-white z-10'}>
				
					{filteredScaffolds.map((scaffold) => (
						<Combobox.Option className={'text-sm flex flex-row items-center justify-between font-mono max-h-[30px] p-6 whitespace-nowrap border-b-2 border-white z-20'} key={scaffold._id} value={scaffold.iupac}>
							<SmileDrawerContainer
								SMILES={scaffold.scaffoldSMILES}
								height={'30px'}
								width={'30px'}
								theme="github"
								className={`w-full h-full p-4 pl-6`} />
							{scaffold.iupac}
						</Combobox.Option>
					))}
					
				</Combobox.Options>

			</Combobox>
					*/}
		</div>

	)

}

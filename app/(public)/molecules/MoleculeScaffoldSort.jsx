"use client"

import { Fragment, useEffect, useState } from 'react'
import useSWR from 'swr'
import { Loader } from '../../_primitives/Loader';
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
		return <div className='h-full flex flex-col items-center justify-center align-middle'><Loader size='default' text={''}/></div>

	if (error)
		console.log(JSON.stringify(error));
	
	return (

		<div className='flex flex-col w-72 h-10'>

			<p className='text-sm mb-3 text-sky-300 font-mono'>Sort by molecular scaffold:</p>

			<select className="select select-info w-full max-w-xs">
				<option disabled selected>Select a scaffold</option>
				{scaffolds.map((scaffold) => (
					<option key={scaffold._id} value={scaffold.iupac}>{scaffold.iupac}</option>
				))}
			</select>

		</div>

	)

}

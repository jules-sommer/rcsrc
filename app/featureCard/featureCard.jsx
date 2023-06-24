import Image from "next/image"
import SmileDrawerContainer from "../molecules/SmilesDrawerContainer"; // ({ SMILES, theme='dark', height, width, className })

String.prototype.truncate = String.prototype.truncate || 
function ( n, useWordBoundary ){
  if (this.length <= n) { return this; }
  const subString = this.slice(0, n-1); // the original check
  return (useWordBoundary 
    ? subString.slice(0, subString.lastIndexOf(" ")) 
    : subString) + "...";
};

const FeaturedCard = ({ molName, CAS, description, molSmiles }) => {

	return (

		<div className='h-[100%] w-[100%] transition-all cursor-pointer hover:origin-center hover:scale-[1.025] bg-gradient-to-t from-indigo-200 via-blue-200 to-sky-200 rounded-2xl'>
			<div className='w-[100%] h-52 rounded-2xl bg-transparent'>
				<SmileDrawerContainer
					SMILES={molSmiles}
					height={"100%"}
					width={"100%"}
					theme="github"
					className={`w-full h-52 p-4 pb-6`}
				/>
			</div>
			<div className='information p-7'>
				<h3 className='name whitespace-nowrap text-slate-900 font-mono pt-5 text-md font-bold border-t-2 border-t-blue-100'>{molName}</h3>
				<h4 className='font-mono text-sm mb-5'><b>CAS# </b>{CAS}</h4>
				<p className='whitespace-normal text-sm text-ellipsis overflow-hidden mh-[300px]'>{description.truncate(250)}</p>
				<div>
					<p className='font-mono text-md mt-5 text-right tracking-tight'>Learn More <span aria-hidden="true">&rarr;</span></p>
				</div>
			</div>
		</div>

	)

}

export default FeaturedCard
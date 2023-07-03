import dynamic from "next/dynamic";

const MoleculeStructure = dynamic(
	() => import("../MoleculeStructure"),
	{ ssr: false }
);

const MoleculeStructureCanvas = ({

	id,
	structure,
	subStructure,
	className,
	width,
	height,
	svgMode,
	extraDetails

}) => {

	return (

		<MoleculeStructure
			id={id}
			structure={structure}
			subStructure={subStructure}
			width={width}
			className={className}
			height={height}
			svgMode={svgMode}
			extraDetails={extraDetails}
		/>

	);

}

export default MoleculeStructureCanvas;
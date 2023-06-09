/* eslint-disable max-len */
export const CHEMICAL_SCAFFOLDS = [
	{
		id: 1,
		name: '[1,4]-diazepine',
		avatar: '/CHEMICAL_SCAFFOLD_AVATARS/[1,4]-diazepine.png',
	},
	{
		id: 2,
		name: 'Gabapentinoid',
	},
	{
		id: 3,
		name: 'Morphinan',
	},
];

export const OPTIONS = {

	SOLUTION: {

		isSterile: false,
		solvents: {
			options: [
				{
					id: 0,
					name: '100% propylene glycol USP,\n ( optional add preservative )',
					costAdd: 2.00,
				},
				{
					id: 1,
					name: '40% propylene glycol USP,\n 5% sodium benzoate + benzoic acid,\n 10% ethyl alcohol,\n ( optional add preservative ),\n sterile water for injection USP',
					costAdd: 10.00,
				},
			],
			selected: false,
		},
		containers: {
			options: [
				{
					id: 0,
					name: 'Autosampler Vial',
					septa: 'PTFE and Silicone Septa',
					top: 'HDPE Screw Top',
					shortHand: 'Autosampler',
					maxVol: 2,
					costAdd: 3.50,
				},
				{
					id: 1,
					name: 'Boro 3.3 Serum Vial',
					septa: 'Butyl Rubber Septa',
					top: ['Flip Top', 'Tear Off'],
					shortHand: 'Serum Vial',
					maxVol: 100,
					costAdd: 5.00,
				},
				{
					id: 2,
					name: 'Amber Reagent Bottle',
					top: 'PP Screw Top',
					shortHand: 'Media Bottle',
					maxVol: 100,
					costAdd: 1.00,
				},
			],
			selected: false,
		},
		concentration: {
			units: ['mg/mL', 'mcg/mL'],
			values: [1, 2, 5, 10, 20, 50, 100, 250, 500],
			selected: false,
		},
		quantities: {
			units: ['mL', 'mg'],
			values: [2, 5, 10, 20, 30, 50, 100, 250, 500],
			selected: false,
		},

	},

	POWDER: {

		CONTAINERS: ['HDPE or Polypropylene Plastic Reagent Bottle'],
		QUANTITIES: {
			UNITS: ['grams', 'milligrams', 'micrograms'],
			VALUES: [2, 5, 10, 25, 50, 100],
		},

	},

	ADD: {

		MEASURING: ['1cc Sol-M Slip-Tip w/ Blunt Fill Needle', '3cc Sol-M Slip-Tip w/ Blunt Fill Needle'],

	},

};

export const PRODUCT_LIST = [

	{

		id: 0,
		molName: 'Etizolam',
		CAS: '40054-69-1',
		iupac: '4-(2-Chlorophenyl)-2-ethyl-9-methyl-6H-thieno[3,2-f][1,2,4]triazolo[4,3-a][1,4]diazepine',
		molImg: '/etizolam.png',
		description: 'Etizolam is a thienodiazepine which is chemically related to benzodiazepine (BDZ) drug class; it differs from BDZs in having a benzene ring replaced with a thiophene ring. It is an agonist at GABA-A receptors and possesses amnesic, anxiolytic, anticonvulsant, hypnotic, sedative and skeletal muscle relaxant properties. Initially introduced in 1983 in Japan as treatment for neurological conditions such as anxiety and sleep disorders, etizolam is marketed in Japan, Italy and India. It is not approved for use by FDA in the US; however it remains unscheduled in several states and is legal for research purposes.',

		scaffold: CHEMICAL_SCAFFOLDS[0],
		tags: ['[1,4]-diazepine', 'GABA-A PAM via BZD-site', 'sedative', 'hypnotic', 'anxiolytic'],

		orderingOptions: {

			format: {
				options: ['Solution', 'Powder'],
				selected: false,
			},
			isSterile: OPTIONS.SOLUTION.isSterile,
			addPreservative: false,
			solvents: OPTIONS.SOLUTION.solvents,
			containers: OPTIONS.SOLUTION.containers,
			concentrations: {
				unit: OPTIONS.SOLUTION.concentration.units[0] /* mg/mL */,
				values: OPTIONS.SOLUTION.concentration.values.slice(0, 4) /* 1,2,5,10 mg/mL */,
				selected: 2,
			},
			quantities: {
				unit: OPTIONS.SOLUTION.quantities.units[1], /* mg */
				values: OPTIONS.SOLUTION.quantities.values.slice(5, 9), /* 50,100,250,500 */
				selected: 1,
			},
			costFunction: (options) => {

				const qty = options.quantities.selected !== false ? options.quantities.values[options.quantities.selected] : 0;

				if (!qty) return (Math.round(0 * 100) / 100).toFixed(2);

				let cost = qty <= 250 && qty >= 0 ? qty * 0.65 : qty * 0.50;

				if (options.isSterile) cost += 7.50;

				if (options.addPreservative) cost += 0.50;

				if (options.containers.selected !== false) {

					console.log(options.containers.selected);

					const containerCostAdd = options.containers.selected.costAdd;
					cost += containerCostAdd;

				}

				if (options.solvents.selected !== false) {

					console.log(options.solvents.selected);
					const solventCostAdd = options.solvents.selected.costAdd;
					cost += solventCostAdd;

				}

				return (Math.round(cost * 100) / 100).toFixed(2);

			},

		},

	},
	{
		molName: 'Pregabalin',
		CAS: '148553-50-8',
		iupac: '(3S)-3-(aminomethyl)-5-methylhexanoic acid',
		molImg: '/pregabalin.png',
		description: 'Pregabalin is a 3-isobutyl derivative of gamma-aminobutyric acid (GABA) with anti-convulsant, anti-epileptic, anxiolytic, and analgesic activities. Although the exact mechanism of action is unknown, pregabalin selectively binds to alpha2delta (A2D) subunits of presynaptic voltage-dependent calcium channels (VDCCs) located in the central nervous system (CNS). Binding of pregabalin to VDCC A2D subunits prevents calcium influx and the subsequent calcium-dependent release of various neurotransmitters, including glutamate, norepinephrine, serotonin, dopamine, and substance P, from the presynaptic nerve terminals of hyperexcited neurons; synaptic transmission is inhibited and neuronal excitability is diminished. Pregabalin does not bind directly to GABA-A or GABA-B receptors and does not alter GABA uptake or degradation.',

		scaffold: CHEMICAL_SCAFFOLDS[1],
		tags: ['γ-aminobutyric acid analogues', 'analgesic', 'anxiolytic', 'anti-convulsant'],

		formats: {
			basic: ['Solution', 'Powder'],
			options: [1, 2, 3, 4, 5],
		},

		quantities: {
			unit: 'g',
			available: [5, 10, 25, 50],
		},

	},
	{
		molName: 'Phenibut HCl',
		CAS: '52950-37-5',
		iupac: '(S)-4-Amino-3-phenylbutanoic acid Hydrochloride',
		molImg: '/phenibut-hcl.png',
		description: 'β-Phenyl-γ-aminobutyric acid ( known commmonly as Phenibut ) is a lesser-known depressant substance of the gabapentinoid class.[2][3] Phenibut acts as a receptor agonist for GABA, the major inhibitory neurotransmitter in the brain. It is chemically related to baclofen, pregabalin, and gabapentin.[4], Phenibut was developed in the Soviet Union in the 1960s, where it has been used as a pharmaceutical drug to treat a wide variety of conditions, including post-traumatic stress disorder, anxiety, depression, asthenia, insomnia, alcoholism, stuttering, and vestibular disorders, and others. Phenibut is a derivative of GABA with a phenyl group in the β-position. The addition of a phenyl ring to the GABA molecule allows it to cross the blood-brain barrier and produce psychoactive effects.[4] Phenibut has a near-identical structure as baclofen, lacking only a chlorine atom in the para-position of the phenyl group',

		scaffold: CHEMICAL_SCAFFOLDS[1],
		tags: ['γ-aminobutyric acid analogues', 'anxiolytic'],

		formats: {
			basic: ['Solution', 'Powder'],
			options: [1, 2, 3, 4, 5],
		},

		quantities: {
			unit: 'g',
			available: [10, 25, 50, 100],
		},

		concentration: [],

	},
	{
		molName: 'Dextromethorphan HBr',
		CAS: '6700-34-1',
		iupac: '(4bS,8aR,9S)-3-Methoxy-11-methyl-6,7,8,8a,9,10-hexahydro-5H-9,4b-(epiminoethano)phenanthrene Hydrobromide',
		molImg: '/dextromethorphan-hbr.png',
		description: 'Dextromethorphan Hydrobromide is the hydrobromide salt form of dextromethorphan, a synthetic, methylated dextrorotary analogue of levorphanol, a substance related to codeine and a non-opioid derivate of morphine. Dextromethorphan exhibits antitussive activity and is devoid of analgesic or addictive property. This agent crosses the blood-brain-barrier and activates sigma opioid receptors on the cough center in the central nervous system, thereby suppressing the cough reflex. Potential research uses include studying the involvement of glutamate receptors in neurotoxicity.',

		scaffold: CHEMICAL_SCAFFOLDS[2],
		tags: ['Morphinan', 'NMDA Receptor Antagonist'],

	},

];

import FeaturedCard from "./featureCard/featureCard"

export default function Home() {

	return (
			<section className='featuredItems bg-slate-950 h-auto pt-16 pb-16'>

				<div className='title w-9/12 mx-auto mb-16'>
					<h1 className='text-sky-100 text-4xl font-mono'>Featured Compounds</h1>
				</div>

				<div class="w-[100%] px-12 grid grid-cols-4 grid-rows-1 grid-flow-col gap-4">
                    <FeaturedCard 
                            molName='Etizolam'
                            CAS='40054-69-1'
                            iupac='4-(2-Chlorophenyl)-2-ethyl-9-methyl-6H-thieno[3,2-f][1,2,4]triazolo[4,3-a][1,4]diazepine'
                            molImg='/etizolam.png'
                            description='Etizolam is a thienodiazepine which is chemically related to benzodiazepine (BDZ) drug class; it differs from BDZs in having a benzene ring replaced with a thiophene ring. It is an agonist at GABA-A receptors and possesses amnesic, anxiolytic, anticonvulsant, hypnotic, sedative and skeletal muscle relaxant properties. Initially introduced in 1983 in Japan as treatment for neurological conditions such as anxiety and sleep disorders, etizolam is marketed in Japan, Italy and India. It is not approved for use by FDA in the US; however it remains unscheduled in several states and is legal for research purposes.'
                        />
                    <FeaturedCard 
                            molName='Pregabalin'
                            CAS='148553-50-8'
                            iupac='(3S)-3-(aminomethyl)-5-methylhexanoic acid'
                            molImg='/pregabalin.png'
                            description='Pregabalin is a 3-isobutyl derivative of gamma-amino butyric acid (GABA) with anti-convulsant, anti-epileptic, anxiolytic, and analgesic activities. Although the exact mechanism of action is unknown, pregabalin selectively binds to alpha2delta (A2D) subunits of presynaptic voltage-dependent calcium channels (VDCCs) located in the central nervous system (CNS). Binding of pregabalin to VDCC A2D subunits prevents calcium influx and the subsequent calcium-dependent release of various neurotransmitters, including glutamate, norepinephrine, serotonin, dopamine, and substance P, from the presynaptic nerve terminals of hyperexcited neurons; synaptic transmission is inhibited and neuronal excitability is diminished. Pregabalin does not bind directly to GABA-A or GABA-B receptors and does not alter GABA uptake or degradation.'
                        />
                    <FeaturedCard 
                            molName='Phenibut HCl'
                            CAS='52950-37-5'
                            iupac='(S)-4-Amino-3-phenylbutanoic acid Hydrochloride'
                            molImg='/phenibut-hcl.png'
                            description=' β-Phenyl-γ-aminobutyric acid (also known as Fenibut, Phenybut, Noofen, Citrocard, and commonly as Phenibut) is a lesser-known depressant substance of the gabapentinoid class.[2][3] Phenibut acts as a receptor agonist for GABA, the major inhibitory neurotransmitter in the brain. It is chemically related to baclofen, pregabalin, and gabapentin.[4]

                            Phenibut was developed in the Soviet Union in the 1960s, where it has been used as a pharmaceutical drug to treat a wide variety of conditions, including post-traumatic stress disorder, anxiety, depression, asthenia, insomnia, alcoholism, stuttering, and vestibular disorders, and others. Phenibut is a derivative of GABA with a phenyl group in the β-position. The addition of a phenyl ring to the GABA molecule allows it to cross the blood-brain barrier and produce psychoactive effects.[4] Phenibut has a near-identical structure as baclofen, lacking only a chlorine atom in the para-position of the phenyl group'
                        />
                    <FeaturedCard 
                            molName='Dextromethorphan HBr'
                            CAS='6700-34-1'
                            iupac='(4bS,8aR,9S)-3-Methoxy-11-methyl-6,7,8,8a,9,10-hexahydro-5H-9,4b-(epiminoethano)phenanthrene Hydrobromide'
                            molImg='/dextromethorphan-hbr.png'
                            description='Dextromethorphan Hydrobromide is the hydrobromide salt form of dextromethorphan, a synthetic, methylated dextrorotary analogue of levorphanol, a substance related to codeine and a non-opioid derivate of morphine. Dextromethorphan exhibits antitussive activity and is devoid of analgesic or addictive property. This agent crosses the blood-brain-barrier and activates sigma opioid receptors on the cough center in the central nervous system, thereby suppressing the cough reflex. Potential research uses include studying the involvement of glutamate receptors in neurotoxicity.'
                        />
				</div>
			</section>
    )

}

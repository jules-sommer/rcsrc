import { getProductByIsFeatured } from "../_utils/api";
import FeaturedCard, { FeatureCardSkeleton } from "../_primitives/featureCard/featureCard";
import { Suspense } from "react";

const Hero = ({ title, blurb, theme = 'default' }) => {

    const gradientWithTheme = 'bg-gradient-to-tl from-slate-950 via-indigo-950 to-cyan-950';

    return (

        <section className={`${gradientWithTheme} p-24`}>

            <div className="font-sans w-9/12 mx-auto flex">

                <div className="w-[50%] subpixel-antialiased">

                <span className='text-2xl leading-6 mb-16 block text-sky-100'>{title}</span>
                <span className="text-sm leading-8 text-sky-100/60">{blurb}</span>

                </div>

            </div>

        </section>

    );

}

const FeaturedProductsSkeleton = () => {

    const featuredSkeletons = [];

    for(let index = 0; index < 4; index++)
        featuredSkeletons.push(<FeatureCardSkeleton />);

    return featuredSkeletons;

}

const Home = async () => {

    let { success, data } = await getProductByIsFeatured(true);

    return (
            
        <>

            <Hero
                title={(<><h1 className="text-4xl mb-6 font-mono tracking-tight">Making the novel accessible;</h1><h3 className="text-2xl font-sans font-extralight text-sky-100/80 tracking-wide">advancing research in organic synthesis, molecular & biological discovery.</h3></>)}
                blurb={(<p>RCSrc Canada is a Canadian research chemical supplier with owners and staff who are passionate about novel APIs, the synthesis thereof, and uncovering fascinating structure-activity relationships to benefit the field of organic chemistry, pharmacology, and synthesis. We are dedicated to bringing Canadian researchers a range of novel compounds covering research areas and receptor-binding profiles often overlooked - allowing researchers a chance to continue to advance their discovery.</p>)}
                theme="lsd"
            />

            <section className='featuredItems bg-slate-950 h-auto pt-24 pb-16'>

                <div className='title w-9/12 mx-auto mb-16'>
                    <h1 className='text-sky-100 text-4xl font-mono'>Featured Compounds</h1>
                </div>

                <div class="w-[100%] px-12 grid grid-cols-4 grid-rows-1 grid-flow-col gap-4">
                    
                    <Suspense fallback={<FeaturedProductsSkeleton />}>

                        {data.map((product) => (
                            <FeaturedCard
                                key={product._id}
                                {...product}
                            />
                        ))}

                    </Suspense>
                        
                </div>

            </section>

        </>

    )

}

export default Home;
const productOptionRadioSelector = ({  }) => {

    return (

        <RadioGroup value={selectedConcentration} onChange={setSelectedConcentration}>

            <RadioGroup.Label className="text-md text-sky-300/50 mb-5">Choose a format to get started:</RadioGroup.Label>

            {concentrations.map( (concentration) => (

                <RadioGroup.Option value={concentration}>
                    {({ checked }) => (
                        
                        <div className='flex flex-row items-center my-2 cursor-pointer'>
                        
                            <span className={checked ? 'bg-green-500 w-4 h-4 border-2 border-green-500 rounded-full mr-4' 
                                                    : 'bg-transparent w-4 h-4 border-2 border-green-500 rounded-full mr-4'}></span>

                            <span className='text-md text-sky-200'>{concentration} {thisProduct.concentration.unit}</span>

                        </div>

                    )}
                </RadioGroup.Option>

            ) )}

        </RadioGroup>

    )

}

export default productOptionRadioSelector
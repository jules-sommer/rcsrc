import Image from "next/image";

const CartListItem = ({ item }) => {

    return (

        <div className="w-full h-auto grid grid-flow-col grid-cols-4 grid-rows-4">
            
            <div className="col-span-1 row-span-4">

                <Image
                    src={item.molImg}
                    fill={true}
                />

            </div>

            <div>

                <h1>{item.molName}</h1>
                <p>{item.CAS}</p>
                <p>{item.totalCost}</p>

            </div>

        </div>

    )

}

export default CartListItem;

export const ViewOrders = ({ tabTitle, display } : { tabTitle: string, display: boolean }) => {

    if( !display )
        return null;

    return (

        <div className={`${display ? 'block' : 'hidden'}`}>

            <h1>{tabTitle}</h1>

        </div>

    )

}
import { getServerSession } from 'next-auth';
import { PaymentCard } from './PaymentCard'
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/auth';
import { Cart, UserSession } from '../../_providers/JotaiProvider';
import { v4 as uuid } from 'uuid';
import { ObjectId } from 'mongodb';

const PaymentPage = async () => {

    const session: UserSession = await getServerSession(authOptions);
    const { user } = session;

    if( !session || !user )
        redirect('/account/login');

    const id = uuid();

    const order: Cart = {
        id: id,
        user: session.user._id,
        items: [
            {
                id: new ObjectId('648a07fa75492f73c283c2a1'),
                name: 'Etizolam',
                configuration: {
                    solvents: {
                        value: 'PG, Ethanol, pH buffer, sterile water USP ( w/optional preservative )',
                        id: new ObjectId('648b914575492f73c283c2ab')
                    },
                    containers: {
                        value: 'Boro 3.3 Serum Vial',
                        id: new ObjectId('648b914575492f73c283c2ac')
                    },
                    concentrations: {
                        value: 10,
                        unit: 'mg/mL'
                    },
                },
                quantity: { 
                    value: 500,
                    unit: 'mg'
                }
            }
        ],
        createdAt: 1689727029,
        paymentDue: 1689727029 + ( 60 * 60 * 2 ), 
    }

    return (

        <div className="prose max-w-full w-9/12 mx-auto">

            <h2>Thank you for your order!</h2>
            <p></p>

            <div>

                <PaymentCard order={order}/>

            </div>

        </div>

    )

}

export default PaymentPage;
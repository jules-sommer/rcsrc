import { Auth, withSSRContext } from 'aws-amplify';
import AuthenticatorWrapper from '../../_providers/AuthenticatorWrapper';
import { headers, cookies } from 'next/headers'
import awsExports from '../../aws-exports';
import { Amplify } from 'aws-amplify'


const Dashboard = async (request, context) => {

    return (

        <div>

            <h1 className='text-4xl font-mono text-white'>This is the admin dashboard</h1>

        </div>

    )

}

export default Dashboard;
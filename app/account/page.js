import { Amplify, withSSRContext } from "aws-amplify";
import { Suspense } from "react";
import UserAccountSummary from "./UserAccountSummary";
import LoaderWrapper from "../_primitives/LoaderWrapper";

import awsExports from '../aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

const Account = async () => {

    return (

        <Suspense fallback={<LoaderWrapper size="large"/>}>
            <UserAccountSummary/>
        </Suspense>

    );

}

export default Account;
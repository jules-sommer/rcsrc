'use client'

import { Amplify, withSSRContext } from "aws-amplify";
import { Loader } from "@aws-amplify/ui-react";
import awsExports from '../aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

const LoaderWrapper = ({ size }) => {

    return (
        <div className="h-[calc(100%-86px)] w-full flex items-center justify-center">
            <Loader size={size} />
        </div>
    )

}

export default LoaderWrapper;
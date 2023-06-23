'use client'

import { Amplify, withSSRContext } from "aws-amplify";
import { Loader } from "@aws-amplify/ui-react";
import awsExports from '../aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

const LoaderWrapper = ({ size }) => {

    return <Loader size={size} />

}

export default LoaderWrapper;
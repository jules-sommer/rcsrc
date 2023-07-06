'use client'

import { Loader } from "@aws-amplify/ui-react";

const LoaderWrapper = ({ size }) => {

    return (
        <div className="h-[calc(100%-86px)] w-full flex items-center justify-center">
            <Loader size={size} />
        </div>
    )

}

export default LoaderWrapper;
'use client'
import { PrimaryBodyText, PrimaryTitleText } from "../../_primitives/Typography";

const Error = ({ error }) => {

    return (
        <div className="w-full h-[calc(100vh - 86px)] p-16 flex-col flex items-center justify-center">

            <PrimaryTitleText className="mb-6">Error: Something Went Wrong</PrimaryTitleText>
            <PrimaryBodyText>The collection of idiots developing this website don't know what happened, so hopefully you do!</PrimaryBodyText>
            
            <pre>{JSON.stringify(error)}</pre>

        </div>
    )

}

export default Error;
import {
    PrimaryTitleText,
    PrimaryBodyText,
    SecondaryTitleText
} from "../../_primitives/Typography";

const TOS = () => {

    return (

        <div className="w-9/12 mx-auto py-16">
            <PrimaryTitleText>Terms of Service</PrimaryTitleText>
            <SecondaryTitleText className="leading-loose">By ordering from this website, you automatically agree to the terms of service outlined on this page. Not abiding by these terms <b className="text-sky-50"><i>will</i></b> result in <b className="text-sky-50"><i>permanent</i></b> suspension of your account with RCSrc Canada and termination of any and all future sales by RCSrc Canada to your person and address.</SecondaryTitleText>
        </div>

    );

}

export default TOS;
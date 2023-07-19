import {
    PrimaryTitleText,
    PrimaryBodyText,
    SecondaryTitleText
} from "../../_primitives/Typography";

const TOS = () => {

    return (

        <div className="w-full">
                
            <div className="w-9/12 mx-auto py-16">
                <PrimaryTitleText>Terms of Service</PrimaryTitleText>
                <SecondaryTitleText className="leading-loose">By ordering from this website, you automatically agree to the terms of service outlined on this page. Not abiding by these terms <b className="text-sky-50"><i>will</i></b> result in <b className="text-sky-50"><i>permanent</i></b> suspension of your account with RCSrc Canada and termination of any and all future sales by RCSrc Canada to your person and address.</SecondaryTitleText>
            </div>

            <div className="prose w-[600px] mx-auto px-16 py-16 pt-0">
                    
                <ul className="w-full min-w-[600px]">

                    <li>You agree to defend, indemnify, and hold harmless RCSrc Canada ( herein known as RCSrc Canada, RCSrc, the company, or TFC Chemical Systems ) and its owners, directors, employees and agents, from and against any claims, actions or demands, including; without limitation, any legal and accounting fees, alleging or resulting from your use of RCSRc's products, compounds or services or your breach of these Terms and Conditions. In other words, you acknowledge by using and ordering from RCSrc that all purchases and products shall be completed and used at your own risk.</li>
                    <li>RCSrc Canada will be held harmless and not responsible for any damages to property or person that result from your research or any other use of our products thereof. You are responsible for understanding and executing the proper safety precautions necessary for working with the chemicals offers by the company.</li>
                    <li>TFH products are sold for research purposes only, and are not for human or animal consumption, strictly no in vivo use. </li>
                    <li>Any customer who intends to use TFH products for in vivo purposes will be banned from purchasing in the future. </li>
                    <li>Customers must be 18 years of age or older. </li>
                    <li>Customers must be aware of the laws in their home country before ordering. If you violate the laws of your country TFH will not be held responsible.  Purchasing our products is done at the customer’s own risk. </li>
                    <li>TFH makes no representation about the fitness for use of any of its products. </li>
                    <li>Chemicals cannot be resold without permission from TFH, products are sold to end-users only. </li>
                    <li>We only accept Monero and Ethereum for cryptocurrency, e-transfer is also an option. </li>
                    <li>Encryption using PGP is recommended when contacting us (public key is below). If you do not encrypt, the risk is yours. </li>
                    <li>Free shipping over 100 dollars!</li>

                </ul>

            </div>

        </div>

    );

}

export default TOS;
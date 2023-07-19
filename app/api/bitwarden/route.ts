const bw = __non_webpack_require__('@bitwarden/sdk-napi')
import { NextResponse, type NextRequest } from 'next/server'

const BitwardenClient = bw.BitwardenClient;

const BwHandler = async (req: NextRequest) => {

    console.log(typeof bw)
    console.log(bw)

    // Optional settings
    const settings = {
        apiUrl: "https://api.bitwarden.com",
        identityUrl: "https://identity.bitwarden.com",
        userAgent: "Bitwarden SDK",
        deviceType: bw.DeviceType.SDK,
    };

    const accessToken = '0.eaa82ec1-33ec-4575-8ef5-b04301203889.xVqG2x0urKFXvZLyje799sr1UxaIbe:o5HLZzDrSs7996mdxWBdmA==';

    console.log(accessToken)

    const client = new BitwardenClient(settings);

    // Authenticating using a service accounts access token
    const result = await client.loginWithAccessToken(accessToken);

    console.log(result)

    if (!result.success) {
        throw Error("Authentication failed");
    }

    // List secrets
    const secrets = await client.secrets().list();

    return NextResponse.json(secrets, { status: 200 });

}

export { BwHandler as GET }
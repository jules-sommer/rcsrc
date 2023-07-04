import { mapKeys } from 'lodash';
import { User } from '../_slices/_auth';

export interface awsCurrentSessionObject {

    accessToken: {},
    idToken: {
        payload: Object,
    },
    refreshToken: Object,
}

export type awsRoute = "idle" | "setup" | "signIn" | "signUp" | "confirmSignIn" | "confirmSignUp" | "setupTOTP" | "forceNewPassword" | "resetPassword" | "confirmResetPassword" | "verifyUser" | "confirmVerifyUser" | "signOut" | "authenticated";

const awsTransformUserOvj = ( user : awsCurrentSessionObject, route: awsRoute ): User => {

    const newUserObj = {
        ...user.signInUserSession.idToken.payload,
        username: user.signInUserSession.idToken.payload["cognito:username"],
        currentStatus: route,
        //cartStore: JSON.parse(user.pool.storage.store.cartStore),
        storage: { ...user.pool.storage.store }
    }

    // Remove 'cognito:' from the keys using lodash _.mapKeys

    const lessCognitoUserObj = mapKeys(newUserObj, (value, key) => {
                                    if (key.includes('cognito:')) {
                                        return key.replace('cognito:', '');
                                    } else {
                                        return key;
                                    }
                                });

    return {

        

    }

}
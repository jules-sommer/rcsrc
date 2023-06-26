import { Link } from '@aws-amplify/ui-react';
import { getUser } from './useUserInfo';

const UseProtectedRoute = async ({ children }) => {

    const [authedUser, setAuthedUser, signOut] = await getUser();

    if(authedUser.isAuthenticated === true) {
        return (
            <>
                {children}
            </>
        )
    } else {
        <>
            <h1>You must login to view this page.</h1>
            <Link href='/account'>Login</Link>
        </>
    }

}

export default UseProtectedRoute;
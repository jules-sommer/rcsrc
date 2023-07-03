'use client'
import { useUserInfo } from './useUserInfo';

const AuthenticatorWrapper = ({ children }) => {

    const [
        route,
    ] = useUserInfo();


    console.log(route);

    if (route === 'idle') {

        return (

            <div className='py-16 w-full flex flex-col items-center justify-center'>

                <Loader />

            </div>

        );

    }
        
    if( route !== 'authenticated' ) {

        redirect('/account/login');
    
    } else {

        return <>{children}</>

    }

}

export default AuthenticatorWrapper;
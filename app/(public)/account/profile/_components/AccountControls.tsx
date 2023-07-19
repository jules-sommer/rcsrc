'use client'

import { sessionAtom, userEmailAtom, signOutAtom } from "../../../../_providers/JotaiProvider";
import { atom, useAtom } from "jotai";

export const AccountControls = ({ user }) => {

    const [session, setSession] = useAtom(sessionAtom);
    const [userEmail, setUserEmail] = useAtom(userEmailAtom);
    const [, signOut] = useAtom(signOutAtom);

    return (

        <>

            <div className="flex flex-col mt-10 items-center justify-center w-full">

                <button
                    className={`btn border-2 border-error bg-error/20 btn-md w-full text-lg 
                                hover:text-white hover:bg-error-40 text-pink-100 font-semibold
                                hover:scale-105 hover:translate-y-[-3px] transition-all ease-in-out`}
                    onClick={() => signOut({ redirect: false, callbackUrl: '/' })}
                >Sign Out</button>

            </div>

        </>

    );

}
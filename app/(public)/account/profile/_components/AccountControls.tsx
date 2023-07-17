'use client'

import { signOut } from "next-auth/react";
import { sessionAtom, userEmailAtom } from "../../../../_providers/JotaiProvider";
import { atom, useAtom } from "jotai";

export const AccountControls = ({ serverSession }) => {

    const [session, setSession] = useAtom(sessionAtom);
    const [userEmail, setUserEmail] = useAtom(userEmailAtom)

    return (

        <>

            <div className="flex flex-col mt-10 items-center justify-center w-full">

                <button
                    className={`btn border-2 border-error bg-error/20 btn-md w-full text-lg 
                                hover:text-white hover:bg-error-40 text-pink-100 font-semibold
                                hover:scale-105 hover:translate-y-[-3px] transition-all ease-in-out`}
                    onClick={() => signOut({ callbackUrl: '/' })}
                >Sign Out</button>

            </div>

        </>

    );

}
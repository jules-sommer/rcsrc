'use client'

import { useAtom } from "jotai";
import { sessionAtom, useUserData, zObjectId } from "../../_providers/JotaiProvider";
import { z } from "zod";
import { zCartItem, CartItem, zCart, Cart } from "../../_providers/JotaiProvider";

export const PaymentCard = ({ order } : Cart) => {

    const dueIn = order.paymentDue - order.createdAt;
    const dueInHours = Math.floor(dueIn / 3600);
    const dueInMinutes = Math.floor((dueIn - dueInHours * 3600) / 60);
    const dueInSeconds = dueIn - dueInHours * 3600 - dueInMinutes * 60;

    return (

        <div className="grid grid-cols-4 grid-rows-4">

            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": dueInHours } as React.CSSProperties}></span>
                    </span>
                    hours
                </div> 
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": dueInMinutes } as React.CSSProperties}></span>
                    </span>
                    min
                </div> 
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": dueInSeconds } as React.CSSProperties}></span>
                    </span>
                    sec
                </div>
            </div>

        </div>

    )

}
'use client';

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { atom, useAtom, useAtomValue } from 'jotai';

import { sessionAtom, useUserData } from "../../../_providers/JotaiProvider";

import { EditProfileDetails } from "./_components/EditProfileDetails";
import { EditAddresses } from "./_components/EditAddresses";
import { ViewOrders } from "./_components/ViewOrders";

const tabsAtom = atom<string[]>([
    "About You",
    "Addresses",
    "Your Orders"
]);


const zTabs = z.union([z.literal(0), z.literal(1), z.literal(2)]);
type Tabs = z.infer<typeof zTabs>

export const activeTabAtom = atom<Tabs>(0)
export const isLoadingAtom = atom(false);
export const updateUserAtom = atom(null)

export const EditProfileWrapper = ({ updateUser } : { updateUser: Function }) => {

    const { authenticated, user } = useUserData();
    const [session, setSession] = useAtom(sessionAtom);

    const [tabs, ] = useAtom(tabsAtom); 
    const [activeTab, setActiveTab] = useAtom(activeTabAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    

    return (

        <div className="flex flex-col w-full h-min">

            <div className="p-8 w-full flex flex-col prose h-min">

                <h1>Tell us more about yourself!</h1>
                <p>Thank you for creating an account with RCSrc Canada, after filling out the required onboarding form below, you will be automatically approved enabling you to place orders with us! You will know when your account is approved when you receive the "customer" badge on your profile. If you haven't done so already, please give us a bit of information about yourself and or your research organization so that we can better serve you!</p>

            </div>

            <div className="m-8 tabs tabs-boxed flex justify-between">
                {tabs.map((tab, index) => (<button id={index.toString()} onClick={() => {
                    setActiveTab(index as Tabs);
                }} className={`tab tab-lg font-mono text-md font-bold flex-grow ${activeTab === index ? 'tab-active !bg-accent' : null}`}>{tab}</button>))}
            </div>

            <div className="tab-group m-8 w-full flex flex-col prose h-min">

                {isLoading ? (
                    
                    <div className="w-full h-full flex items-center justify-center"><span className="loading loading-ring loading-lg"></span></div>
                
                ) : (
                    
                    <>
                    
                        <EditProfileDetails tabTitle={tabs[0]} display={activeTab === 0 ? true : false} updateUser={updateUser}/>
                        <EditAddresses tabTitle={tabs[1]} display={activeTab === 1 ? true : false} />
                        <ViewOrders tabTitle={tabs[2]} display={activeTab === 2 ? true : false} />

                    </>

                )}

            </div>

            

        </div>

    )


}
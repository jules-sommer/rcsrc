"use client"

import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";
import { useIsClient } from '../_providers/isClientProvider';
import { createWrapper } from "next-redux-wrapper";

import cartReducer from '../_slices/_cart';
import authReducer from '../_slices/_auth';

const makeStore = () => {

    const rootReducer = combineReducers({
        carts: cartReducer,
        users: authReducer,
    });

    configureStore({
        reducer: {
            rootReducer,
        },
        devTools: true,
    });

}

export const wrapper = createWrapper(makeStore);
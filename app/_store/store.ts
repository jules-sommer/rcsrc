'use client'

import { useIsClient } from '../_providers/isClientProvider';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { emptyCart, addItem } from '../_slices/_cart';
import authReducer, { signUserOut, logUserIn } from '../_slices/_auth';


export const store = configureStore({
    reducer: {
        cartReducer,
        authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
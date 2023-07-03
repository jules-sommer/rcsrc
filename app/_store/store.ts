import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../_slices/_cart';

export const store = configureStore({
    reducer: {
        cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
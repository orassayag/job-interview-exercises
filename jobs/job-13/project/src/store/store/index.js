import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { devicesSlices, reservationsSlices, settingsSlices } from '../slices';

const store = configureStore({
    reducer: {
        devices: devicesSlices.devicesSlice.reducer,
        reservations: reservationsSlices.reservationsSlice.reducer,
        settings: settingsSlices.settingsSlice.reducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: process.env.NODE_ENV === 'development'
});

export default store;
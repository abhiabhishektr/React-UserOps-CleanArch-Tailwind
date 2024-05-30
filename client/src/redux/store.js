// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

// Configure and create the Redux store
export const store = configureStore({
    // Define the reducers for the store
    // 'user' key corresponds to the state slice managed by userReducer
    reducer: { user: userReducer },
    // Customize the default middleware
    middleware: (getDefaultMiddleware) => 
        // Disable serializable state invariant middleware check
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// The configured store is exported for use in the application

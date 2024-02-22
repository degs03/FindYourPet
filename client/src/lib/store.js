import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from "./features/users/userSlice";

import { persistReducer, persistStore } from 'redux-persist';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const userPersistConfig = {
    key: 'user',
    storage: storage,
}


const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
})


export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
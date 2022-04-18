import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import localforage from 'localforage';
import thunk from 'redux-thunk';

import historyReducer from './historyReducer';
import categoryReducer from "./categoryReducer";
import settingsReducer from './settingsReducer';

// Persist using localforage, better localstorage
const config = {
    key: "root",
    storage: localforage
};

// Combine all reducers into one
const rootReducer = combineReducers({
    history: historyReducer,
    categories: categoryReducer,
    settings: settingsReducer,
});

// Use redux persist for persisting the state
const reducer = persistReducer(config, rootReducer);

// Create the store amd export it
export const store = configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(thunk),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Needed for accessing the and dispatching actions to state
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
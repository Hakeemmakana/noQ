import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer }from "redux-persist"
import persistStore from "redux-persist/es/persistStore";
import storage  from "redux-persist/lib/storage";
import userAuthReducer from '../features/auth/authSlice/userAuthSlice'
import adminAuthReducer from '../features/auth/authSlice/adminAuthSlice'
const persistConfig={
    key:'root',
    storage,
}
const rootReducer=combineReducers({
    userAuth:userAuthReducer,
    adminAuth:adminAuthReducer
})

const persistedReducer=persistReducer(persistConfig,rootReducer)
export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
    

})

export const persistor=persistStore(store)

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

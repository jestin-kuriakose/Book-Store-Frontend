import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import counterReducer from "./counterSlice"
import userReducer from "./userSlice"

const persistConfig = {
    key: 'root',
    storage,
  }


const rootReducer = combineReducers({ 
    user: userReducer,
    counter: counterReducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)
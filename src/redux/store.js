import { configureStore,combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cart'
import qtyReducer from "./quantity";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({ 
    cart: cartReducer,
    qty:qtyReducer
    // order: orderReducer
  })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
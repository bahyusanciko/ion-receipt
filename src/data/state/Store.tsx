import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { ReceiptReducer } from "./ReceiptReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['receipt'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    receipt: ReceiptReducer
  })
);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


const Persistor = persistStore(Store);

const state = Store.getState;

const ClearPresistor = () =>{
  Persistor.pause();
  Persistor.flush().then(() => {
    return Persistor.purge();
  });
}

export type State = ReturnType<typeof state>;

export { Store, Persistor, ClearPresistor };
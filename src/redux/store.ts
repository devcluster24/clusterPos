import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer } from "./reducer/rootReducer";
import { baseApi } from "./api/baseApi";

// Persist config for authentication
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"], // Only persist necessary auth data
};

const persistedAuthReducer = persistReducer(persistConfig, reducer.auth);

export const store = configureStore({
  reducer: {
    ...reducer,
    auth: persistedAuthReducer, // Apply persistence only to auth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

// TypeScript Type Inference
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

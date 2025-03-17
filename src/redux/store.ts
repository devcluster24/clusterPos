import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer } from "./reducer/rootReducer";
import { baseApi } from "./api/baseApi";

// Persist config for authentication
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"], // Only persist necessary auth data
};

const gStatePersistConfig = {
  key: "gState",
  storage,
  whitelist: [], // Adjust whitelist as necessary for gState
};

const persistedAuthReducer = persistReducer(authPersistConfig, reducer.auth);
const persistedStateReducer = persistReducer(
  gStatePersistConfig,
  reducer.gState
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    gState: persistedStateReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

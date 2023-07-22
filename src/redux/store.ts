import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sigupReducer from "./slices/signup-slice"
import loginReducer from "./slices/login-slice"
import fetchProfileReducer from "./slices/get-profile.slice"

export const store = configureStore({
    reducer: {
      signupAuth: sigupReducer,
    loginAuth: loginReducer,
      fetchProfile:fetchProfileReducer
  },
    devTools: process.env.NODE_ENV !== "production",
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;
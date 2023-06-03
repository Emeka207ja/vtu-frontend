import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sigupReducer from "./slices/signup-slice"

export const store = configureStore({
    reducer: {
      signupAuth:  sigupReducer
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
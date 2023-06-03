import { iSignup } from "../interface/iSignup";
import { signupAction } from "../actions/signup-action";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IsignupState {
    userId: iSignup | null;
    pending: boolean;
    success: boolean;
    error: any;
    isError:boolean
}

const initialState: IsignupState = {
    userId: null,
     pending: false,
    success: false,
    error: null,
    isError:false
};

export const userSlice = createSlice({
  initialState,
  name: 'signupSlice',
  reducers: {
    reset: (state, action: PayloadAction<iSignup>) => {
        state.pending = false;
        state.success = false;
        state.error = null;
    },
    },
   extraReducers: builder => {
        builder
            .addCase(signupAction.pending, (state) => {
                state.pending = true;
           })
            .addCase(signupAction.fulfilled, (state, action) => {
                state.pending= false
                state.success = true;
                state.userId = action.payload;
                state.isError = false
           })
           .addCase(signupAction.rejected, (state,action) => {
               state.pending = false;
               state.success = false;
               state.error = action.payload;
            //    state.error = "failed";
               state.userId = null;
               state.isError = true
           })
       
  },
});

export default userSlice.reducer;

export const {  reset } = userSlice.actions;



import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/login-action";

interface iState{
    accessToken: string | null;
    success: boolean;
    pending: boolean;
    isError: boolean;
    error:any
}
if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("token")!)
}
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

const initialState: iState ={
    accessToken:token,
    success: false,
    pending: false,
    isError: false,
    error : null
}

export const loginSlice = createSlice({
     initialState,
    name: "login",
    reducers : {
        reset: (state) => {
            state.success = false;
            state.pending = false
            state.isError = false;
            state.error = null
        },
        logout: (state) => {
            if (typeof window !== undefined) {
               localStorage.removeItem("token")
           }
            state.accessToken = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.pending = true;
                state.success = false;
                state.isError = false;
                state.error = null
            })
            .addCase(loginAction.fulfilled, (state,action) => {
                state.pending = false;
                state.success = true;
                state.accessToken = action.payload;
                state.isError = false;
                state.error = null
            })
        .addCase(loginAction.rejected,(state,action)=>{
                state.pending = false;
                state.success = false;
                state.isError = true;
                state.error = action.payload;
        })
    }
 
})

export default loginSlice.reducer;
export const {reset,logout}  = loginSlice.actions

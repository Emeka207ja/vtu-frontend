import { createSlice } from "@reduxjs/toolkit";
import { getProfileAction } from "../actions/getProfile.action";
import { iProfile } from "../interface/profileInterface";
import { InitialProfile } from "../interface/profileInterface";
import { profile } from "console";


interface profile{
    Profile: iProfile;
    pending: boolean;
    success: boolean;
    error: any;
    isError: boolean;
}

const initialState:profile = {
    Profile: InitialProfile,
    pending: false,
    success: false,
    error: null,
    isError:false
}

export const profileSlice = createSlice({
    initialState,
    name: "profileSlice",
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProfileAction.pending, (state, action) => { 
                state.pending = true;
            })
            .addCase(getProfileAction.fulfilled, (state, action) => { 
                state.success = true;
                state.pending = false;
                state.isError = false;
                state.error = null
                state.Profile = action.payload
            })
            .addCase(getProfileAction.rejected, (state, action) => { 
                state.success = false;
                state.pending = false;
                state.isError = true;
                state.error = action.payload
                
            });
    }
})

export default profileSlice.reducer
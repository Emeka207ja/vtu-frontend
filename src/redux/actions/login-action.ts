import { createAsyncThunk } from "@reduxjs/toolkit";
import { iLogin } from "@/Components/Auth/Login";
import { loginApi } from "@/api-folder/auth";
import axios from "axios";

export const loginAction = createAsyncThunk(
    "auth/login",
        async (loginDetails: iLogin, thunkApi) => {
            try {
                const { data } = await axios.post(loginApi, loginDetails)
                typeof window !== 'undefined' ? localStorage.setItem('token',JSON.stringify(data)) : null
                return data;
            } catch (error:any) {
                 const message = (error.response && error.response.data && error.response.data.message) || error.message;
                console.log(error)
                return thunkApi.rejectWithValue(message)
            }
        }
)



export const signout = createAsyncThunk(
    "logout",
    async (_, thunkApi) => {
        localStorage.removeItem("token");
    }
)

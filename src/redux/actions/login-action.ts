import { createAsyncThunk } from "@reduxjs/toolkit";
import { iLogin } from "@/Components/Auth/Login";
import { loginApi } from "@/api-folder/auth";
import axios from "axios";

export const loginAction = createAsyncThunk(
    "auth/login",
        async (loginDetails: iLogin, thunkApi) => {
            try {
                const { data } = await axios.post(loginApi, loginDetails)
               
                const token: string = data.access_token!
                typeof window !== 'undefined' ? localStorage.setItem('token',JSON.stringify(token)) : null
                return  data.access_token!;
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
       try {
         localStorage.removeItem("token");
        localStorage.removeItem("profile");
       } catch (error:any) {
        console.log(error)
       }
    }
)

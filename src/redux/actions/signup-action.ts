import { createAsyncThunk } from '@reduxjs/toolkit';
import { signupApi } from '@/api-folder/auth';
import axios from 'axios';

export const signupAction = createAsyncThunk('auth/signup',
    async (Data: { email: string, password: string, username: string, referral?: string }, thunkApi) => {
        console.log(Data.referral)
        try {
            const {data} = await axios.post(signupApi,Data);
            return data;
        } catch (error:any) {
            
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

    
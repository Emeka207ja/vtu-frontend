import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileApi } from '@/api-folder/profile';
import axios from 'axios';

export const getProfileAction = createAsyncThunk('profile/getProfile',
    async (Data: { email: string, password: string, username: string }, thunkApi) => {
      
        const Token = JSON.parse(localStorage.getItem('token')||"{}")
        const config = {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }
        try {
            const {data} = await axios.post(getProfileApi,Data,config);
            return data;
        } catch (error:any) {
            
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
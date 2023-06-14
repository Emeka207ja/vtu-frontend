import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileApi } from '@/api-folder/profile';
import axios from 'axios';

export const getProfileAction = createAsyncThunk('profile/getProfile',
    async (_, thunkApi) => {
      
        const Token = JSON.parse(localStorage.getItem('token')||"{}")
        const config = {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }
        try {
            const { data } = await axios.get(getProfileApi, config);
            console.log(data)
            return data;
        } catch (error:any) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message);
        }
    }
);
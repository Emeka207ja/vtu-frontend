import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileApi } from '@/api-folder/profile';
import axios from 'axios';

export const getProfileAction = createAsyncThunk('profile/getProfile',
    async (token:string, thunkApi) => {
      
        // const Token = JSON.parse(localStorage.getItem('token')||"{}")
        const config = {
            headers: {
                Authorization: `Bearer ${token.slice(1,-1)}`
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
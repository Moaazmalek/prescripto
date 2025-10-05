import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { User,  AuthState } from "../../utils/zod";

const tokenFromLocalStorage = localStorage.getItem("token");

const initialState: AuthState = {
  user: null,
  token: tokenFromLocalStorage,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<string, {email:string;password:string}, {rejectValue:string}>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        credentials
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        return data.token;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const registerUser = createAsyncThunk("auth/registerUser",async(userData,{rejectWithValue})=>{
    try {
        const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,userData);
        localStorage.setItem("token",data.token);
        return data.token
        
    } catch (error:any) {
        return rejectWithValue(error.response.data.message)
        
    }
})

export const fetchCurrentUser=createAsyncThunk<User,void,{state:{auth:AuthState};rejectWithValue:string}>("auth/fetchCurrentuser",async(_,{getState,rejectWithValue}) => {
const token=getState().auth.token;
if(!token) return rejectWithValue("No Token Available")
   
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.user;
    } catch (error: any) {
      console.log("Error fetching current user:", error);
      return rejectWithValue("Failed to fetch current user");
    }
});


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state) => {
            state.user=null;
            state.token=null;
            localStorage.removeItem("token")

        },

    },
    extraReducers:(builder) => {
        builder
          .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => { state.loading = false; state.token = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<string>) => { state.loading = false; state.token = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })

      .addCase(fetchCurrentUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
         state.loading = false; state.user = action.payload;
         console.log("ACTION PAYLOAD",action.payload);
         })
      .addCase(fetchCurrentUser.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
        

    }
});

export const {logout}=authSlice.actions
export default authSlice.reducer;
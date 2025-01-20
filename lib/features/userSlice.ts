import { User } from "@/types";
import axiosClient from "@/utils/axiosClient";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the slice's state
interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: UserState = {
  user: {
    created_at: null,
    updated_at: null,
    user_id: null,
    email: "",
    password: "",
    full_name: "",
    dob: null,
    phone: null,
    avatar_url: "",
    status: "",
    role: null,
  },
  loading: false,
  error: null,
};

// Define the login parameters
interface LoginParams {
  email: string;
  password: string;
}

// Define the response type from the API
interface LoginResponse {
  metadata: User;
}

// Create the async thunk for login
export const handleLogin = createAsyncThunk<
  LoginResponse,
  LoginParams,
  { rejectValue: string }
>(
  "userLoginSlice/handleLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post<LoginResponse>(
        `/auths/login?type=emailAndPassword`,
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        handleLogin.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.user = action.payload.metadata;
          localStorage.setItem("user", JSON.stringify(action.payload.metadata));
        }
      )
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export default userSlice;

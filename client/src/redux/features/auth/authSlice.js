import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
};

// Асинхронный thunk для регистрации пользователя
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ username, password }) => {
        try {
            const { data } = await axios.post("/auth/register", {
                username,
                password,
            });

            if (data.token) {
                window.localStorage.setItem("token", data.token);
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

// Асинхронный thunk для логина пользователя
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ username, password }) => {
        try {
            const { data } = await axios.post("/auth/login", {
                username,
                password,
            });

            if (data.token) {
                window.localStorage.setItem("token", data.token);
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

// Асинхронный thunk для получения пользователя
export const getMe = createAsyncThunk("auth/getMe", async () => {
    try {
        const { data } = await axios.get("/auth/me");
        return data;
    } catch (error) {
        console.log(error);
    }
});

// Создание слайса для управления состоянием аутентификации
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
        },
        clearError: (state) => {
            state.status = null;
        },
    },

    // Используем builder callback notation для определения extraReducers
    extraReducers: (builder) => {
        builder

            // Register user
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = action.payload.message;
                state.isLoading = false;
            })

            // Login user
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = action.payload.message;
                state.isLoading = false;
            })

            // Проверка авторизации
            .addCase(getMe.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = null;
                state.user = action.payload?.user;
                state.token = action.payload?.token;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = action.payload.message;
                state.isLoading = false;
            });
    },
});

// test new
export const selectUserId = (state) => state.auth.user?._id;

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;

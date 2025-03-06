import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import { getMe } from "../../features/auth/authSlice";

const initialState = {
    user: null,
    isLoading: false,
    status: null,
    error: null,
};

// Асинхронный thunk для добавления адреса
export const addAddress = createAsyncThunk(
    "address/add",
    async ({ userId, address }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.post("/address/add", { userId, address });
            dispatch(getMe());
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Асинхронный thunk для удаления адреса
export const removeAddress = createAsyncThunk(
    "address/remove",
    async ({ userId, addressId }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.delete("/address/remove", {
                data: { userId, addressId },
            });
            dispatch(getMe());
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Асинхронный thunk для обновления адреса
export const updateAddress = createAsyncThunk(
    "address/update",
    async ({ userId, addressId, address }, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axios.put("/address/update", {
                userId,
                addressId,
                address,
            });
            dispatch(getMe());
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add address
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            // Remove address
            .addCase(removeAddress.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
                state.error = null;
            })
            .addCase(removeAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(removeAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                state.error = action.payload;
            })
            // Update address
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default addressSlice.reducer;

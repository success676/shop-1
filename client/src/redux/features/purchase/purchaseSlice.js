import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    purchases: [],
    loading: false,
    error: null,
};

// Асинхронное действие для создания покупки
export const createPurchase = createAsyncThunk(
    "purchases/createPurchase",
    async (userId, thunkAPI) => {
        try {
            const response = await axios.post("/api/purchases", { userId });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// Асинхронное действие для получения покупок пользователя
export const getPurchases = createAsyncThunk(
    "purchases/getPurchases",
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get(`/api/purchases/${userId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const purchaseSlice = createSlice({
    name: "purchases",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createPurchase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPurchase.fulfilled, (state, action) => {
                state.loading = false;
                state.purchases.push(action.payload);
            })
            .addCase(createPurchase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            .addCase(getPurchases.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPurchases.fulfilled, (state, action) => {
                state.loading = false;
                state.purchases = action.payload;
            })
            .addCase(getPurchases.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export default purchaseSlice.reducer;

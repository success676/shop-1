import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    purchases: [],
    loading: false,
};

// Асинхронное действие для создания покупки
export const createPurchase = createAsyncThunk(
    "purchases/createPurchase",
    async (userId, thunkAPI) => {
        try {
            const response = await axios.post("/purchases/create", { userId });
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
            const response = await axios.get(`/purchases/${userId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const clearPurchases = createAsyncThunk("/purchases/clearPurchases", async () => {
    return {};
});

const purchaseSlice = createSlice({
    name: "purchases",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(createPurchase.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPurchase.fulfilled, (state, action) => {
                state.loading = false;
                state.purchases.push(action.payload);
            })
            .addCase(createPurchase.rejected, (state) => {
                state.loading = false;
            })

            .addCase(getPurchases.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPurchases.fulfilled, (state, action) => {
                state.loading = false;
                state.purchases = action.payload;
            })
            .addCase(getPurchases.rejected, (state) => {
                state.loading = false;
            })

            .addCase(clearPurchases.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearPurchases.fulfilled, (state) => {
                state.loading = false;
                state.purchases = [];
            })
            .addCase(clearPurchases.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default purchaseSlice.reducer;

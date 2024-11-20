import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    categories: [],
    loading: false,
};

export const getAllCategories = createAsyncThunk(
    "categories/getAllCategories",
    async () => {
        try {
            const { data } = await axios.get("/category/getAllCategories");
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    favorites: [],
    loading: false,
};

export const addToFavorites = createAsyncThunk(
    "favorites/addToFavorites",
    async ({ userId, productId }, {dispatch}) => {
        try {
            const response = await axios.post("/favorites/add", {
                userId,
                productId,
            });
            dispatch(getFavorites(userId));
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const removeFromFavorites = createAsyncThunk(
    "favorites/removeFromFavorites",
    async ({ userId, productId }, { dispatch }) => {
        try {
            const response = await axios.post("/favorites/remove", {
                userId,
                productId,
            });
            dispatch(getFavorites(userId));
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getFavorites = createAsyncThunk(
    "favorites/getFavorites",
    async (userId) => {
        try {
            const response = await axios.get(`/favorites/${userId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const clearFavorites = createAsyncThunk("/favorites/clearFavorites", async () => {
    return {};
});

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(addToFavorites.rejected, (state) => {
                state.loading = false;
            })

            .addCase(removeFromFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(removeFromFavorites.rejected, (state) => {
                state.loading = false;
            })

            .addCase(getFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = action.payload;
            })
            .addCase(getFavorites.rejected, (state) => {
                state.loading = false;
            })

            .addCase(clearFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favorites = [];
            })
            .addCase(clearFavorites.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default favoritesSlice.reducer;

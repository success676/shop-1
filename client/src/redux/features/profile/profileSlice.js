import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import { getMe } from "../../features/auth/authSlice";

export const uploadProfilePhoto = createAsyncThunk(
    "profile/uploadProfilePhoto",
    async ({ userId, formData }, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.post(
                `/profile/upload/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            dispatch(getMe());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProfilePhoto = createAsyncThunk(
    "profile/deleteProfilePhoto",
    async (userId, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.delete(`/profile/delete/${userId}`);
            dispatch(getMe());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(uploadProfilePhoto.pending, (state) => {
                state.status = "loading";
            })
            .addCase(uploadProfilePhoto.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
            })
            .addCase(uploadProfilePhoto.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            
            .addCase(deleteProfilePhoto.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteProfilePhoto.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
            })
            .addCase(deleteProfilePhoto.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default profileSlice.reducer;

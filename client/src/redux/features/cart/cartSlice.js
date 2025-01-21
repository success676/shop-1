import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";

const initialState = {
    cart: [],
    loading: false,
    totalPrice: 0,
    totalTax: 0,
};

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId }, { dispatch }) => {
        try {
            const { data } = await axios.post("/cart/addToCart", {
                userId,
                productId,
            });
            dispatch(getCart(userId));
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Ошибка добавления товара в корзину.");
            }
            throw error;
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeCartItem",
    async ({ userId, productId }, { dispatch }) => {
        try {
            const { data } = await axios.post("cart/removeCartItem", {
                userId,
                productId,
            });
            dispatch(getCart(userId));
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
    try {
        const { data } = await axios.get(`/cart/${userId}`);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
    return {};
});

// cartSlice.js

export const checkStock = createAsyncThunk(
    "cart/checkStock",
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/cart/${userId}`);
            const cart = data.products;

            for (const item of cart) {
                const { data: product } = await axios.get(`/products/${item.product._id}`);
                if (product.stock < item.quantity) {
                    return rejectWithValue({ message: `Недостаточно товара "${product.title}" на складе.` });
                }
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        calculateTotals: (state) => {
            state.totalPrice = state.cart.reduce(
                (total, item) => total + item.product.price,
                0
            );
            state.totalTax = (state.totalPrice * 0.05).toFixed(2); // 5% налог
        },
    },
    extraReducers: (builder) => {
        builder
            // Add To Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.products;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(addToCart.rejected, (state) => {
                state.loading = false;
            })

            // Remove Cart Item
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.products;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(removeCartItem.rejected, (state) => {
                state.loading = false;
            })

            // Get Cart
            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.products;
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(getCart.rejected, (state) => {
                state.loading = false;
            })

            // Clear Cart
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.cart = [];
                cartSlice.caseReducers.calculateTotals(state);
            })
            .addCase(clearCart.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;

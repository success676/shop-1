import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import productSlice from "./features/product/productSlice";
import cartSlice from "./features/cart/cartSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import purchaseSlice from "./features/purchase/purchaseSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        products: productSlice,
        cart: cartSlice,
        favorites: favoritesReducer,
        purchases: purchaseSlice,
    },
});

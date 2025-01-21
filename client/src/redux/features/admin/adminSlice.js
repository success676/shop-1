import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    users: [],
    products: [],
    purchases: [],
    categories: [],
    isLoading: false,
    status: null,
};

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
    try {
        const { data } = await axios.get("/admin/users");
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const updateUserRole = createAsyncThunk(
    "admin/updateUserRole",
    async ({ id, role }, { dispatch }) => {
        try {
            const { data } = await axios.put(`/admin/users/${id}`, { role });
            dispatch(fetchUsers()); // Обновляем список пользователей после изменения роли
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchProducts = createAsyncThunk(
    "admin/fetchProducts",
    async () => {
        try {
            const { data } = await axios.get("/admin/products");
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const createProduct = createAsyncThunk(
    "admin/createProduct",
    async (product) => {
        try {
            const { data } = await axios.post("/admin/products", product);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "admin/updateProduct",
    async ({ id, product }) => {
        try {
            const { data } = await axios.put(`/admin/products/${id}`, product);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "admin/deleteProduct",
    async (id) => {
        try {
            await axios.delete(`/admin/products/${id}`);
            return id;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchPurchases = createAsyncThunk(
    "admin/fetchPurchases",
    async () => {
        try {
            const { data } = await axios.get("/admin/purchases");
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchCategories = createAsyncThunk(
    "admin/fetchCategories",
    async () => {
        try {
            const { data } = await axios.get("/admin/categories");
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updatePurchaseStatus = createAsyncThunk(
    "admin/updatePurchaseStatus",
    async ({ id, status }) => {
        try {
            const { data } = await axios.put(`/admin/purchases/${id}`, {
                status,
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch users
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            })

            // Update user role
            .addCase(updateUserRole.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                const index = state.users.findIndex(
                    (user) => user._id === action.payload._id
                );
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            })

            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            })

            // Create product
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            })

            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(
                    (product) => product._id === action.payload._id
                );
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            })

            // Delete product
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter(
                    (product) => product._id !== action.payload
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            })

            // Fetch purchases
            .addCase(fetchPurchases.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(fetchPurchases.fulfilled, (state, action) => {
                state.isLoading = false;
                state.purchases = action.payload;
            })
            .addCase(fetchPurchases.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            })

            // Fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            })

            // Update purchase status
            .addCase(updatePurchaseStatus.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(updatePurchaseStatus.fulfilled, (state, action) => {
                const index = state.purchases.findIndex(
                    (purchase) => purchase._id === action.payload._id
                );
                if (index !== -1) {
                    state.purchases[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updatePurchaseStatus.rejected, (state, action) => {
                state.status = action.error.message;
                state.isLoading = false;
            });
    },
});

export default adminSlice.reducer;

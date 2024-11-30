import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);

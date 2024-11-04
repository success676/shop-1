import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            default: false,
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        },
        favorites: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Favorites",
        },
        purchases: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Purchase",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
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
        role: {
            type: String,
            default: "user",
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
        contactInfo: {
            fullName: String,
            email: String,
            phone: String,
            address: {
                street: String,
                city: String,
                state: String,
                zip: String,
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);

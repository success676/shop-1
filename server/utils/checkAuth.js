import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkAuth = async (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.userId = decoded.id;
            const user = await User.findById(req.userId);
            req.user = user;

            next();
        } catch (error) {
            return res.json({
                message: "Нет доступа.",
            });
        }
    } else {
        return res.json({
            message: "Нет доступа.",
        });
    }
};

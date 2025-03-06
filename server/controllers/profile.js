import User from "../models/User.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadProfilePhoto = async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.files && req.files.image) {
            const fileName = Date.now().toString() + req.files.image.name;
            const uploadPath = path.join(
                __dirname,
                "..",
                "uploads",
                "profile",
                fileName
            );

            req.files.image.mv(uploadPath, (err) => {
                if (err) {
                    return res
                        .status(500)
                        .json({
                            message: "Ошибка при загрузке файла",
                            error: err.message,
                        });
                }
            });

            const user = await User.findByIdAndUpdate(
                userId,
                { profilePhoto: fileName },
                { new: true }
            );

            res.status(200).json({
                message: "Фото профиля успешно загружено",
                user,
            });
        } else {
            res.status(400).json({ message: "Файл не найден" });
        }
    } catch (error) {
        res.status(500).json({
            message: "Ошибка сервера",
            error: error.message,
        });
    }
};

export const deleteProfilePhoto = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        if (user.profilePhoto) {
            const filePath = path.join(
                __dirname,
                "..",
                "uploads",
                "profile",
                user.profilePhoto
            );
            fs.unlinkSync(filePath);
        }

        user.profilePhoto = undefined;
        await user.save();

        res.status(200).json({ message: "Фото профиля успешно удалено", user });
    } catch (error) {
        res.status(500).json({
            message: "Ошибка сервера",
            error: error.message,
        });
    }
};

export const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({
            message: "Доступ запрещен. Требуется доступ администратора.",
        });
    }
};

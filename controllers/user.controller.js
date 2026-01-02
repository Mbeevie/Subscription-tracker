import User from "../models/user.model.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

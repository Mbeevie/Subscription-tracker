import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const authenticateToken = async(req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            res.status(401).json({ success: false, message: 'unauthorized access!!' });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            res.status(401).json({ success: false, message: 'unauthorized access!!' });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};
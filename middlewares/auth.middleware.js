import { verifyToken } from '../utils/jwt.js';

const authMiddleware = (req, res, next) => {
    const authToken = req.cookies.token;
    
    if (!authToken) {
        return next({ status: 401, msg: 'Unauthorized' });
    }

    try {
        const payload = verifyToken(authToken);
        req.user = payload;
        next();
    } catch (error) {
        return next({ status: 403, msg: 'Invalid or expired token' });
    }
};

export default authMiddleware;

const { verify } = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ err: 'Access denied, no token provided, please login again' });
    }

    verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ err: 'Invalid token, please login again' });
        }

        req.user = user;

        next();
    });
}

module.exports = authMiddleware;
const jwt = require('jsonwebtoken');
const authRouter = require('../routers/auth');

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json('No auth token, access denied');
            
        }
        const verified = jwt.verify(token, 'passwordKey');
        if(!verified) return res.status(401).json('Token verification failed, authorization denied'); 
        req.user = verified.id;
        req.token = token;
        next();

    } catch (e) {
            res.status(500).json(e.errors.messeage);
    }

}
module.exports = auth;
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const privateKey = fs.readFileSync(path.resolve(process.env.PRIVATE_KEY), 'utf8');
const publicKey = fs.readFileSync(path.resolve(process.env.PUBLIC_KEY), 'utf8');

const signToken = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: '14d'
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, publicKey, {
        algorithms: ['RS256']
    });
};

export { signToken, verifyToken };
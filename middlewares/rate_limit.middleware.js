import rateLimit from 'express-rate-limit';

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later."
});

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Too many login attempts. Please wait 10 minutes.",
    standardHeaders: true,
    legacyHeaders: false
});

export { generalLimiter, loginLimiter };
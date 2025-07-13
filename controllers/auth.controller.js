import { User } from '../models/index.js';
import otpGenerator from 'otp-generator';
import sendMail from '../config/mail.js';
import { signToken } from '../utils/jwt.js';

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({where: { email: email }});
        if (user && await user.validPassword(password)) {
            const token = signToken({ id: user.id });

            const otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: true,
                alphabets: true
            });

            const to = user.email;
            const subject = "Account Verification";
            const text = `OTP: ${otp}`;
            user.update({otp: otp});
            sendMail(to, subject, text);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production" ? true : false,
                sameSite: 'Strict', 
                maxAge: 1209600000 
            });
            return res.send('Logged In');
        } else {
            return next({ status: 401, msg: "Invalid Login Info" });
        }
    } catch (error) {
        console.log(error);
    }
    
}

const signup = async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                first_name,
                last_name,
                password
            }
        });

        if (created) {
            return res.status(201).send('User Created');
        } else {
            return next({ status: 409, msg: "Email Already In Use" });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }

}


const logout = (req, res, next) => {
    res.clearCookie('token');
    return res.send('Logged Out');
};


const verify = async (req, res, next) => {
    const userId = req.user.id;
    const { otp } = req.body;
    const user = await User.findByPk(userId);        
    if (user) {
        try {
            const check = await user.validOtp(otp);
            if (check) {
                await user.update({otp: null, isActive: true});
                return res.send('Verified');
            } else {
                next({ status: 400, msg: 'Invalid OTP' });
            }
        } catch (error) {
            next(error);
        }
    } else {
        next({ status: 401, msg: "Invalid User" });
    }
}


const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: true,
            alphabets: true
        });

        const to = user.email;
        const subject = "Change Password";
        const text = `OTP: ${otp}`;
        await user.update({otp: otp});
        sendMail(to, subject, text);
        return res.send("OTP has been sent");
    } else {
        return next({ status: 404, msg: 'Email Not Found' });
    }
}

const changePassword = async (req, res, next) => {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        const check = await user.validOtp(otp);
        if (check) {
            await user.update({ password: password, otp: null });
            return res.send("Password Changed");
        } else {
            return next({ status: 401, msg: 'OTP Invalid' });
        }
    } else {
        return next({ status: 404, msg: 'Email Not Found' });
    }
}

export { login, signup, verify, logout, forgetPassword, changePassword };
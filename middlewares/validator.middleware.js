import Joi from 'joi';

const loginValidator = (req, res, next) => {
    const { email, password } = req.body;

    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required(),
        password: Joi.string().min(8).max(30).required()
    });

    const { error, value } = schema.validate({
        email: email,
        password: password
    });

    if (error) {
        return next({ status: 400, msg: error.details[0].message });
    } else {
        return next();
    }
}

const signupValidator = (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;

    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().lowercase().trim().required(),
        password: Joi.string().min(8).max(30).required()
    });

    const { error, value } = schema.validate({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    });

    if (error) {
        return next({ status: 400, msg: error.details[0].message });
    } else {
        return next();
    }
}

const verifyValidator = (req, res, next) => {
    const { otp } = req.body;
    const schema = Joi.object({
        otp: Joi.string().length(6).trim().required()
    });
    const {error, value} = schema.validate({otp: otp});
    if (error) {
        return next({ status: 400, msg: error.details[0].message });
    } else {
        return next();
    }
}

const forgetPasswordValidator = (req, res, next) => {
    const { email } = req.body;

    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required()
    });

    const { error, value } = schema.validate({
        email: email
    });

    if (error) {
        return next({ status: 400, msg: error.details[0].message });
    } else {
        return next();
    }
}


const changePasswordValidator = (req, res, next) => {
    const { email, otp, password } = req.body;

    const schema = Joi.object({
        email: Joi.string().email().lowercase().trim().required(),
        otp: Joi.string().length(6).trim().required(),
        password: Joi.string().min(8).max(30).required()
    });

    const { error, value } = schema.validate({
        email: email,
        otp: otp,
        password: password
    });

    if (error) {
        return next({ status: 400, msg: error.details[0].message });
    } else {
        return next();
    }
}

export { 
    loginValidator,
    signupValidator,
    verifyValidator,
    forgetPasswordValidator, 
    changePasswordValidator
};
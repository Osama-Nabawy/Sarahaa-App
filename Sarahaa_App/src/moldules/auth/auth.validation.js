import joi from 'joi';
export const signupValidation = joi.object({
    username: joi.string().min(2).max(20).required().trim().message("username must be between 2 and 20 characters"),
    email: joi.string().email().required().trim().lowercase().messages({
        "string.email": "email must be a valid email",
        "string.empty": "email is required",
    }),
    password: joi.string().min(8).required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).messages({
        "string.pattern.base": "password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
        "string.empty": "password is required",
    }),
    repassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.only": "passwords do not match",
        "string.empty": "repassword is required",
    }),
    phonenumber: joi.string().min(11).max(11).pattern(new RegExp("^(010|011|012|015)[0-9]{8}$")).required().messages({
        "string.pattern.base": "phone number must be a valid Egyptian phone number",
        "string.empty": "phone number is required",
    }),
    gender: joi.number().valid(0, 1, 2).default(0).messages({
        "number.only": "gender must be 0 for male, 1 for female, or 2 for other",
    }),
}).or("email", "phonenumber").messages({
    "object.missing": "either email or phone number is required",
});
export const loginValidation = joi.object({
    email: joi.string().email().required().trim().lowercase().messages({
        "string.email": "email must be a valid email",
        "string.empty": "email is required",
    }),
    password: joi.string().min(8).required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")).messages({
        "string.pattern.base": "password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
        "string.empty": "password is required",
    }),
});
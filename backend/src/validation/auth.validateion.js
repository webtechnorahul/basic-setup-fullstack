// validators/auth.validation.js
import { body, validationResult } from 'express-validator';

// 1. Register Validation Rules 
export const registerValidationRules = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required.')
        .isLength({ min: 3 }).withMessage('name must be more then 2 character'),
        
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('please enter correct email format')
        .normalizeEmail(),
        
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('password must be more then 6 character')
];


// Login validation rules
export const loginValidationRules = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email bharna zaroori hai.')
        .isEmail().withMessage('Kripya sahi email format enter karein.')
        .normalizeEmail(),
        
    body('password')
        .notEmpty().withMessage('Password bharna zaroori hai.')
];

// 2. Middleware that check error
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next(); //if not error then move on next
    }
    
    // if error then execute this code
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        success: false,
        errors: extractedErrors,
    });
};

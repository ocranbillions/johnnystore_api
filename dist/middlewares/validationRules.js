"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validationRules = function (method) {
    switch (method) {
        case 'register':
            return [
                express_validator_1.body('name')
                    .trim()
                    .isLength({ min: 1 }) // todo update check
                    .withMessage('Name cannot be empty'),
                express_validator_1.body('email')
                    .isEmail()
                    .withMessage('Invalid email'),
                express_validator_1.body('password')
                    .trim()
                    .isLength({ min: 6 })
                    .withMessage('Password must be at least 6 characters'),
            ];
        case 'login':
            return [
                express_validator_1.body('email')
                    .isEmail()
                    .withMessage('Invalid email'),
                express_validator_1.body('password')
                    .trim()
                    .isLength({ min: 6 })
                    .withMessage('Password must be at least 6 characters'),
            ];
        default:
            return []; // todo
    }
};
exports.default = validationRules;

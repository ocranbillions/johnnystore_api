"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validate = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    var cleanedErrorObjects = []; // todo Create interface
    errors.array().map(function (err) {
        var _a;
        return cleanedErrorObjects.push((_a = {}, _a[err.param] = err.msg, _a));
    });
    // throw custom Error - todo
    return res.status(400).json({
        success: false,
        errors: cleanedErrorObjects,
    });
};
exports.default = validate;

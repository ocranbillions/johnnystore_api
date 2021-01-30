"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authControllers_1 = require("../controllers/authControllers");
var validationRules_1 = __importDefault(require("../middlewares/validationRules"));
var validate_1 = __importDefault(require("../middlewares/validate"));
var router = express_1.Router();
router.post('/register', validationRules_1.default('register'), validate_1.default, authControllers_1.register);
router.post('/login', validationRules_1.default('login'), validate_1.default, authControllers_1.login);
exports.default = router;

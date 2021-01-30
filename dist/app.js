"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
var app = express_1.default();
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
app.get("/", function (req, res) {
    res.status(200).json({
        success: true,
        message: "Welcome to Todoist"
    });
});
app.all('*', function (req, res) {
    return res.status(404).json({
        errors: [{ message: "Page not found" }]
    });
});
app.use(function (error, req, res, next) {
    var env = process.env.NODE_ENV;
    if (env === 'development' || env === 'test') {
        console.log(error.stack);
        return res.status(500).json({
            errors: [{ message: error.message }]
        });
    }
    return res.status(500).json({
        errors: [{ message: "something went wrong" }]
    });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("App is listening on port " + port);
});

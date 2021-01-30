"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrate = exports.query = void 0;
var mysql_1 = __importDefault(require("mysql"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var connectionPool;
var getPool = function () {
    if (!connectionPool) {
        connectionPool = mysql_1.default.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            database: process.env.DB_NAME || 'johnny_store',
            password: process.env.DB_PASSWORD || '',
            connectionLimit: 20,
            // dateStrings: 'date',
            multipleStatements: true
        });
    }
    return connectionPool;
};
var pool = getPool();
var query = function (sql, values) {
    if (values === void 0) { values = null; }
    return new Promise(function (resolve, reject) {
        if (Array.isArray(values)) {
            pool.query(sql, values, function (err, rows) {
                if (err)
                    reject(err);
                resolve(rows);
            });
        }
        else {
            pool.query(sql, function (err, rows) {
                if (err)
                    reject(err);
                resolve(rows);
            });
        }
    });
};
exports.query = query;
// TODO: COPY jonny.sql to dist folder
// For DB Migration - npm run migrate
var dataSql = fs_1.default.readFileSync(path_1.default.join(__dirname, "johnny.sql")).toString();
var migrate = function () {
    pool.query(dataSql, function (err, res) {
        console.log(err, res);
        connectionPool.end();
    });
};
exports.migrate = migrate;
require("make-runnable");

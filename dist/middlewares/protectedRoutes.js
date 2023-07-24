"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401);
        throw new Error("🚫 Un-Authorized 🚫");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
        req.payload = payload;
    }
    catch (err) {
        res.status(401);
        if (err.name === "TokenExpiredError") {
            throw new Error(err.name);
        }
        throw new Error("🚫 Un-Authorized 🚫");
    }
    return next();
};
exports.isAuthenticated = isAuthenticated;

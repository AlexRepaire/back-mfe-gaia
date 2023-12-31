"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateAccessToken = (user) => {
    console.log(user);
    return jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "5m",
    });
};
exports.generateAccessToken = generateAccessToken;

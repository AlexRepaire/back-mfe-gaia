"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const express_1 = require("express");
const exceptions_1 = require("~/utils/exceptions");
const users_service_1 = require("../users/users.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("~/utils/jwt");
const AuthController = (0, express_1.Router)();
exports.AuthController = AuthController;
const userService = new users_service_1.UsersService();
/**
 * @route GET api/auth
 * @description connection
 * @access Public
 */
AuthController.get("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new exceptions_1.BadRequestException("You must provide a email and a password.");
        }
        const existingUser = await userService.findUserByEmail(email);
        if (!existingUser) {
            throw new exceptions_1.BadRequestException("Invalid login credentials.");
        }
        const validPassword = await bcrypt_1.default.compare(password, existingUser.password);
        if (!validPassword) {
            throw new exceptions_1.BadRequestException("Invalid login credentials.");
        }
        const accessToken = (0, jwt_1.generateAccessToken)(existingUser);
        res.json({
            accessToken,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * @route POST api/auth
 * @description inscription
 * @access Public
 */
AuthController.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new exceptions_1.BadRequestException("You must provide an email and a password.");
        }
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            throw new Error("Email already in use.");
        }
        const user = userService.createUserByEmailAndPassword({
            email,
            password,
            id: "",
            name: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        res.json({
            accessToken,
        });
    }
    catch (err) {
        next(err);
    }
});
